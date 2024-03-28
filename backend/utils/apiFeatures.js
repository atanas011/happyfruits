export class APIFeatures {

    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i' // ignore case
            }
        } : {}
        // console.log(keyword)

        this.query = this.query.find({ ...keyword })
        return this
    }

    filter() {
        // a copy for this method, because paginate() is chained to it
        const queryCopy = { ...this.queryStr }
        // console.log(queryCopy)
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(field => delete queryCopy[field])
        // console.log(queryCopy)
        // console.log(this.queryStr)

        // Filter for greater than / less than values
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        // console.log(queryStr)

        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    paginate(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        // console.log(Number(this.queryStr.page))
        const skip = resPerPage * (currentPage - 1)
        
        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}
