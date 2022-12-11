const { activity_groups } = require('../');

//generate response function
function response(status, message, data) {
    return {status, message, data};
}

// ---------------------------------createSome---------------------------------- //
const createSome = async (res, data) => {
  await activity_groups.create(data);
  const userData = await activity_groups.findAll({where:{email:data.email}, attributes:{exclude:['is_deleted', 'deleted_at']}});
  const lastItem = userData[userData.length - 1];
  return res.status(201).json(response('Success', 'Success', lastItem));
}

// ---------------------------------getSome---------------------------------- //
const getSome = async (res, id) => {

  //cek apakah user merequest data by id. Jika iya..
  if(id){
    const userData = await activity_groups.findOne({where:{id:id, is_deleted:false}, attributes: ['id', 'email', 'title', 'createdAt', 'updatedAt', 'deleted_at']});

    //cek apakah request data by id berhasil di dapatkan
    if(typeof userData === 'object' && userData !== null){
      return res.status(201).json(response('Success', 'Success', userData));
    } else {
      //jika gagal
      return res.status(404).json(response('Not Found', `Activity with ID ${id} Not Found`, {}));
    }
  } else {
    //user merequest all data tanpa id
    const userData = await activity_groups.findAll({
      where:{is_deleted:false},
      attributes:{exclude:['is_deleted', 'deleted_at']}});

    //cek apakah request data berhasil di dapatkan
    if(typeof userData === 'object' && userData !== null){
      return res.status(200).json(response('Success', 'Success', userData));
    }
  }
}
// ---------------------------------updateSome---------------------------------- //
const updateSome = async (res, data) => {

  const checkQueryUpdate = await activity_groups.update({title:data.title}, {
    where:{id:data.ActivityId, is_deleted:false}});
  if(checkQueryUpdate != 0){
    const userData = await activity_groups.findOne({where:{id:data.ActivityId, is_deleted:false}, attributes:{exclude:['is_deleted', 'deleted_at']}});
    return res.status(200).json(response('Success', 'Success', userData));
  } else {
    //jika gagal
    return res.status(404).json(response('Not Found', `Activity with ID ${data.ActivityId} Not Found`, {}));
  }
}
// ---------------------------------deleteSome---------------------------------- //
const deleteSome = async (res, todoId) => {

  const date = new Date();
  const checkQueryUpdate = await activity_groups.update({is_deleted:true, deleted_at:date}, {where:{id:todoId}});
  if(checkQueryUpdate != 0){
    return res.status(200).json(response('Success', 'Success', {}));
  } else {
    //jika gagal
    return res.status(404).json(response('Not Found', `Activity with ID ${todoId} Not Found`, {}));
  }
}

module.exports = { createSome, getSome, deleteSome, updateSome };
