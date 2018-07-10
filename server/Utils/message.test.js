var expect=require('expect');

var {generateMessage}=require('./message');
describe('generateMessage',()=>{
    it('should generate message object',()=>{
        var from="admin";
        var text="testing"
        var res=generateMessage(from,text)
       // expect(res.createdAt).toBeA('number')
        expect(res.from).toEqual(from)
        expect(res.text).toEqual(text)
    })
})