import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import signupPage from '../pages/SignupPage'

describe('Cadastro', () => {

    //Caso de Teste - CT01
    it('Usuário deve ser um entregador', function () {

        //cria massa de dados
        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        //validando Modal
        const expectedMessage = "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato."
        signup.modalContentShouldBe(expectedMessage)

    })

    //Caso de Teste - CT02
    it('CPF Incorreto', function () {

        var deliver = signupFactory.deliver()
        deliver.cpf = '0347547854AA'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')

    })

    //Caso de Teste - CT03
    it('Email Incorreto', function () {

        var deliver = signupFactory.deliver()
        deliver.email = 'teste.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    
    })

    context('Campos obrigatórios', function() {
       
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP'},
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega'},
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }

        ]

        before(function() {
            signup.go()
            signup.submit()
        })

        //Caso de Teste - CT04  dinamico, step by step sem abortar o processo
        messages.forEach(function(msg) {
            it(`${msg.field} is required`, function() {
                signup.alertMessageShouldBe(msg.output)
            })
        })

    })

})