import { observable, action } from 'mobx'

const baseUrl = 'https://www.vue-js.com/api/v1'

class Articles {
  @observable data = []
  @observable currentPage = 1
  @observable isLoading = false

  @action async fetchArticleList(page, limit = 5, tab = 'share') {
    const query = `page=${page}&limit=${limit}&tab=${tab}`

    this.isLoading = true
    const data = await fetch(`${baseUrl}/topics?${query}`).then(res => res.json())
    this.isLoading = false

    this.data = [...this.data, ...data.data]
    this.currentPage ++
  }
}

export default new Articles()
