class Comments{
    constructor(_id , authorId ,articalId , userId , comment , like ,date){
        this.id=_id
        this.authorId = authorId
        this.articalId = articalId 
        this.userId = userId
        this.comment = comment
        this.like = like
        this.date = date
    }
}

module.exports = Comments