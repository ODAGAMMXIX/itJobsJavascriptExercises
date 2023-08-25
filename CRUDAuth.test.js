const signIn = require('./CRUDAuth');

test('try signing in', ()=> {
    var response = signIn("teste","senha")
    expect(response.message).toBe('Login successful')
    expect(response.token).toBe('example_session_token')
    //"message" + "token" = elemntos dentro do JSON
});