import Email from "../../src/domain/pessoa/Email";

test("Deve validar o email válido", function(){
    const email = new Email("mauricioformes@hotmail.com");
    expect(email).toBeTruthy();
});


test("Não deve validar o email inválido", function(){
    const email = "umastringqualquer241414135";
    expect(() => new Email(email)).toThrow(new Error("Email Inválido"));
})