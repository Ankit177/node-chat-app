var expect=require('expect');

var {generateMessage}=require('./message');
var {generateLocationMessage}=require('./message')


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

describe('generateLocationMessage',()=>{
    it('should generate location message object',()=>{
        var from="admin";
        latittude=12
        longitude=14
        var url=`https://www.google.com/maps/?q=${latittude},${longitude}`
        var res=generateLocationMessage(from,latittude,longitude)
       // expect(res.createdAt).toBeA('number')
        expect(res.from).toEqual(from)
        expect(res.url).toEqual(url)
    })
})