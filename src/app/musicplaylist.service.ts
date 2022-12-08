import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MusicplaylistService {

 constructor(private http:HttpClient) {}

    getPlaylist() {
        return this.http.get('https://melophile-app.herokuapp.com/playlist/getallmusic');
    }
    addSongTOplaylist(data:any){
       return this.http.post('https://melophile-app.herokuapp.com/playlist/create',data);
    }
    updateSongToPlaylist(id:any,data:any){
      return this.http.put('https://melophile-app.herokuapp.com/playlist/update/'+id,data);
    }
    deleteSongDB(id:any){
      return this.http.delete('https://melophile-app.herokuapp.com/playlist/delete/'+id);
    }
    createSongDB(data:any){
      return this.http.post('https://melophile-app.herokuapp.com/playlist/create',data);
    }


}
