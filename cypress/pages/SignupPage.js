
// Padrão de Projeto - PageObject -> cria-se classes que representam elementos e funções da página.
class SignupPage {

    go() {
        cy.visit('/')
        //Checkpoint serve para verificar que esta indo para o caminho certo
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(delivery) {

        //Preenchendo formulário
        cy.get('input[name="fullName"]').type(delivery.name)
        cy.get('input[name="cpf"]').type(delivery.cpf)
        cy.get('input[name="email"]').type(delivery.email)
        cy.get('input[name="whatsapp"]').type(delivery.whatsapp)

        cy.get('input[name="postalcode"]').type(delivery.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(delivery.address.number);
        cy.get('input[name="address-details"]').type(delivery.address.details);

        //Validações
        cy.get('input[name="address"]').should('have.value', delivery.address.street);
        cy.get('input[name="district"]').should('have.value', delivery.address.district);
        cy.get('input[name="city-uf"]').should('have.value', delivery.address.city_state);

        //Função para juntar Localizador CSS com um Texto
        cy.contains('.delivery-method li', delivery.delivery_method).click()

        //Upload de arquivos
        cy.get('input[accept*="image/"]').attachFile('/images/' + delivery.cnh);

    }

    submit() {
        cy.get('form button[type="submit"]').click();
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('div [class="swal2-html-container"]').should('have.text', expectedMessage);
    }

    alertMessageShouldBe(expectedMessage) {
        //Validando span de alerta
        //cy.get('span[class="alert-error"]').should('have.text', expectedMessage);
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }

}
// export instanciando
export default new SignupPage;

