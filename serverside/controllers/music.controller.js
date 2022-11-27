const music = require('../models/music.model');

//Simple version, without validation or sanitation
exports.music_details = function (req,res,next,) {
    var data =[]
    music.find({},function (err, music) {
        if (err) return next(err);
        music.forEach(element => {
            data.push(element)
        });
        
        res.send(JSON.stringify(data));
    })

};
exports.music_create = function (req, res, next) {
    let Music = new music(
        {
            Song_Url: req.body.Song_Url,
            Song_Title: req.body.Song_Title,
            Albam_Title:req.body.Albam_Title,
            playlist_title: req.body.playlist_title
        }
    );

    Music.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Music Created successfully')
        
    })
};
exports.music_update= function (req, res, next){
    console.log(req.params.id);
    music.findOneAndUpdate(
        {_id:req.params.id},
        {$set:{
            playlist_title: req.body.playlist_title
        }},
        {new:true },
        (err,doc) => {
            if(err) return next(err)
            res.status(200)
            res.send(doc)
        }
    )
}
exports.music_delete =function (req, res, next){
    music.findOneAndDelete({_id:req.params.id},(err,doc) => {
        if(err) return next(err)
        res.status(200);
        res.send(doc);
    })
}
