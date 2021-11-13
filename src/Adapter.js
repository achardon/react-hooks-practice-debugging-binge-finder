class Adapter {
  static getShows (){
    fetch("http://api.tvmaze.com/shows")
    .then(res => res.json())
  }

  static getShowEpisodes (showID){
    return fetch(`http://api.tvmaze.com/shows/${showID}/episodes`)
    .then(res => res.json)
  }

  // static async getShowEpisodes (showID){
  //   const res = await fetch(`http://api.tvmaze.com/shows/${showID}/episodes`)
  //   return res.json
  // }

}

export default Adapter
