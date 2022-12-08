import { Component, OnInit } from '@angular/core';
import {MusicplaylistService} from '../musicplaylist.service'

// import { ToastrService } from 'ngx-toastr';
// import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  text="Top 50 English"
  playlist:any=[]
  color:any=[]
  cplaylist: any;
  letters = '0123456789ABCDEF';
  show:boolean=true;
  newplaylist:any=''
  error: boolean=false;
  playlistnames:any[]=[]
  topPlaylist:any=[
    "Top 50 English",
    "Top 50 World",
    "Top 50 Pop",
    "Top 50 Party"
]
  upload:boolean=false
  showplus: boolean=false;
  currentindex: any=0;
  Song_Title:any='';
  Song_URL:any='';
  Albam_Title:any='';
  Playlist_name:any=''
  constructor( private _playlistService:MusicplaylistService) { }

  ngOnInit(): void {
    this.getallplaylist("top")

  }

  getallplaylist(val:any) {
    this._playlistService.getPlaylist().subscribe((res:any)=>{
      this.playlist=res;
      this.playlistnames=[]
      for(var i=0;i<this.playlist.length;i++){
        for(var j=0;j<this.playlist[i].playlist_title.length;j++){
          if(!this.topPlaylist.includes(this.playlist[i].playlist_title[j]) && !this.playlistnames.includes(this.playlist[i].playlist_title[j])){
             this.playlistnames.push(this.playlist[i].playlist_title[j])
          }
        }
      }
      this.changeplaylist(this.currentindex,val)
    },(err)=>{
      console.log("Error occured");
    })
  }

  changeplaylist(val:any,pos:any){
    this.showplus=false
    if(val==-1){
      this.text="List of songs"
      this.showplus=true
    }
    else if(val==-2){
      this.text="List of songs"
    }
    else if(pos=="top"){
      this.text=this.topPlaylist[val]
    }
    else{
      this.currentindex=val
      this.text=this.playlistnames[val]
    }

    console.log(this.currentindex);

    this.changeplaylistsong("NotAddtoPlaylist")

  }
  changeplaylistsong(val:any){
    this.show=true
    if(val=='NotAddtoPlaylist'){
     if(this.text!="List of songs"){
      this.cplaylist=this.playlist.filter((song:any) => song.playlist_title.indexOf(this.text)>-1  );
    }
    else{
      this.cplaylist=this.playlist
    }
    }
    else{
      this.cplaylist=this.playlist.filter((song:any) => song.playlist_title.indexOf(this.text)==-1)
      console.log(this.cplaylist)
    }
    for(let i=0;i<this.cplaylist.length;i++){
        this.color[i]='#'
      for (var k = 0; k < 6; k++) {
          this.color[i] += this.letters[Math.floor(Math.random() * 16)];
      }
    }
      // console.log(this.cplaylist);


  }
  reload(){
    window.location.reload()
  }
  validate(){
    if(this.newplaylist!=''){
      this.show=true
      this.error=false
    }
    else{
      this.error=true
    }
  }
  AddSongToPlaylist(id:any){
    this.text="Adding to "+this.newplaylist;
    this.cplaylist[id].playlist_title.push(this.newplaylist)
    var data={
      Song_Url: this.cplaylist[id].Song_Url,
            Song_Title:this.cplaylist[id].Song_Title,
            Albam_Title:this.cplaylist[id].Albam_Title,
            playlist_title: this.cplaylist[id].playlist_title,
    }
    this._playlistService.updateSongToPlaylist(this.cplaylist[id]._id,data).subscribe((res)=>{
      console.log(res)
      this.cplaylist.filter((song:any)=>song._id!=this.cplaylist[id]._id)
    },(Error)=>{
      console.log(Error);
    })
  }
  deleteSongFromPlaylist(id:any){
     this.cplaylist[id].playlist_title.pop(this.text)
    var data={
      Song_Url: this.cplaylist[id].Song_Url,
            Song_Title:this.cplaylist[id].Song_Title,
            Albam_Title:this.cplaylist[id].Albam_Title,
            playlist_title: this.cplaylist[id].playlist_title,
    }
    this._playlistService.updateSongToPlaylist(this.cplaylist[id]._id,data).subscribe((res)=>{
      console.log(res)
      // this.tr.success("Successfully Deleted")
      this.getallplaylist("my")
    },(Error)=>{
      console.log(Error);
      // this.tr.error("Error Occured in deleting")

    })
  }
  async deletePlaylist(){
     for(let i=0;i<this.cplaylist.length;i++){
      await this.deleteSongFromPlaylist(i)
    }
    window.location.reload()
  }

  deleteSongFromDB(id:any){
    console.log(this.cplaylist[id]._id);

    this._playlistService.deleteSongDB(this.cplaylist[id]._id).subscribe((res)=>{
      // this.tr.success("Successfully Deleted")
      console.log(res);

    },(Error)=>{
      console.log(Error);
      // this.tr.error("Error Occured in deleting")

    })
  }
  UploadSongDB(){
   if(this.Song_Title!="" && this.Song_URL!="" &&
    this.Albam_Title!="" && this.Playlist_name!=''){
    this.error=false
    var a:any=[]
    a.push(this.Playlist_name)
    var data={
      "Song_Url": this.Song_URL,
      "Song_Title": this.Song_Title,
      "Albam_Title":this.Albam_Title,
      "playlist_title": a
    }
    this._playlistService.createSongDB(data).
    subscribe((res)=>{
      console.log(res)
    },(Error)=>{
      console.log(Error);
    })
   }
   else{
     this.error=true
   }
  }

}
