class TodoController{
    async todoGet(){
        try{
            console.log("todoGet")
        }catch (e){
            console.log(e)
        }
    }
    async todoPost(){
        try{
            console.log("todoPost")
        }catch (e){
            console.log(e)
        }
    }
    async todoRemove(){
        try{
            console.log("todoRemove")
        }catch (e){
            console.log(e)
        }
    }
}

module.exports = new TodoController()