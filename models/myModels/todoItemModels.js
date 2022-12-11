const { todo_items } = require('../');

//generate response function
function response(status, message, data) {
    return {status, message, data};
}

// ---------------------------------createdAt---------------------------------- //
const createSome = async (res, data) => {
  await todo_items.create(data);
  const userData = await todo_items.findAll({
    where:{activity_group_id:data.activity_group_id, is_deleted:false},
    attributes:{exclude:['is_deleted', 'deleted_at']}});
    const lastItem = userData[userData.length - 1];
    return res.status(201).json(response('Success', 'Success', lastItem));
}

// ---------------------------------getSome---------------------------------- //
const getSome = async (res, param) => {
  const key = Object.keys(param).toString();
  //cek apakah user merequest data by id. Jika iya..
  switch (key) {

    //Get All Data
    case 'activity_group_id' :
        const activityGroupData = await todo_items.findAll({
          where:{activity_group_id:param.activity_group_id, is_deleted:false},
          attributes:{exclude:['is_deleted']}});

        if(typeof activityGroupData === 'object' && activityGroupData !== null && activityGroupData.length !== 0 ){
          return res.status(200).json(response('Success', 'Success', activityGroupData));
        } else {
          //jika gagal
          return res.status(404).json(response('Not Found', `Todo List with ID ${param.activity_group_id} Not Found`, {}));
        }
    break;

    //Get Data By Id
    case 'todoId':
        const todoListData = await todo_items.findOne({
          where:{id:param.todoId, is_deleted:false},
          attributes:{exclude:['is_deleted']}});

        //cek apakah request data by id berhasil di dapatkan
        if(typeof todoListData === 'object' && todoListData !== null){
          return res.status(200).json(response('Success', 'Success', todoListData));
        } else {
          //jika gagal
          return res.status(404).json(response('Not Found', `Todo with ID ${param.todoId} Not Found`, {}));
        }
    break;

    default:
        return res.status(201).json(response('Not Found', 'Param Not Found', {}));
      break;

  }
}

// ---------------------------------updateSome---------------------------------- //
const updateSome = async (res, data, todoId) => {
  const checkQueryUpdate = await todo_items.update(data, {where:{id:todoId}});
  if(checkQueryUpdate != 0){
    const userData = await todo_items.findOne({where:{id:todoId, is_deleted:false}, attributes:{exclude:['is_deleted']}});
    return res.status(200).json(response('Success', 'Success', userData));
  } else {
    //jika gagal
    return res.status(404).json(response('Not Found', `Todo List with ID ${todoId} Not Found`, {}));
  }
}

// ---------------------------------deleteSome---------------------------------- //
const deleteSome = async (res, todoId) => {
  const date = new Date();
  const checkQueryUpdate = await todo_items.update({is_deleted:true, deleted_at:date}, {where:{id:todoId}});
  if(checkQueryUpdate != 0){
    return res.status(200).json(response('Success', 'Success', {}));
  } else {
    //jika gagal
    return res.status(404).json(response('Not Found', `Todo List with ID ${todoId} Not Found`, {}));
  }
}

module.exports = { createSome, getSome, deleteSome, updateSome };
