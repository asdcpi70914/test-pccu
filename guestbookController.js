exports.list_all_entries = function(req, res) {
  var obj={
    entries:[],
  }
  var entries=req.app.locals.entries;
  for(var i=0;i<entries.length;i++){
      obj.entries.push(entries[i]);
  }
  obj.success=true;
  res.json(obj);
};

exports.create_an_entry = function(req, res) {
  var new_entry = req.body;
  new_entry.published=new Date(); 
  req.app.locals.entries.push(new_entry);
  console.log( 'Create new entry');

  res.json({
    success:true,
    title: req.body.title,
  })
};

exports.update_an_entry = function(req, res) {
  var update_entry = req.body;
  var entries=req.app.locals.entries;
  var entryIndex=-1;
  for(var i=0;i<entries.length;i++){
      if(entries[i].title==update_entry.title){
        entryIndex=i;
      }
  }
  if(entryIndex!=-1){
      entries[entryIndex].content=update_entry.content;
      return res.json({
        success:true,
        title: req.body.title,
        content: entries[entryIndex].content,
      });
  }
  else
    res.json({
        success:false,
        message:"not found",
    })
};

exports.delete_an_entry = function(req, res) {
  var idx=-1;
  var entries=req.app.locals.entries;
  for(var i=0;i<entries.length;i++){
    if(entries[i].title==req.body.title){
      idx=i;
    }
  }
  if(idx!=-1){
    entries.splice(idx, 1);
    return res.json({
        success:true,
        deleted_title: req.body.title,
      });  
  }
  else
  res.json({
      success:false,
      message:"not found",
  })
};