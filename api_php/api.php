<?php
/** DOC FLOW API
*/

class DocFlowAPI extends SQLite3
{
    private $requestMethod = '';
    private $action = '';
    private $param1;
    private $param2;
    private $query_string = '';
    private $preparedQuery = '';

    private $response_status = 'initial...';
    private $response_message = 'initial...';

    function __construct()
    {
        $this->open('database/doc_flow.db');
        $this->action = null;
        $this->param1 = null;
        $this->param2 = null;
        $this->query_string = 'PRAGMA foreign_keys = ON';
        $select_result = $this->query($this->query_string);
        
    }

    function setRequestMethod($request_method) {
        $this->requestMethod = $request_method;
    }

    function setAction($action)
    {
        $this->action = $action;
    }

    function setParam1($param_value)
    {
        $this->param1 = $param_value;
    }

    function setParam2($param_value)
    {
        $this->param2 = $param_value;
    }


    function generateQueryString()
    {
        $this->query_string = '';
        $this->preparedQuery = '';


        
        if ($this->requestMethod === 'DELETE') {

            switch($this->action) {
                case 'user':
                    $this->preparedQuery = $this->prepare('DELETE FROM users WHERE id=:id');
                    $this->preparedQuery->bindValue(':id', $this->param1, SQLITE3_INTEGER);
                    break;

                case 'group':
                    $this->preparedQuery = $this->prepare('DELETE FROM groups WHERE id=:id');
                    $this->preparedQuery->bindValue(':id', $this->param1, SQLITE3_INTEGER);
                    break;

                case 'usergroup':
                    $this->preparedQuery = $this->prepare('DELETE FROM users_groups WHERE user_id=:user_id AND group_id=:group_id');
                    $this->preparedQuery->bindValue(':user_id', $this->param1, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':group_id', $this->param2, SQLITE3_INTEGER);
                    break;

                case 'action':
                    $this->preparedQuery = $this->prepare('DELETE FROM actions WHERE id=:id');
                    $this->preparedQuery->bindValue(':id', $this->param1, SQLITE3_INTEGER);
                    break;

                case 'pathstepgroup':
                    $this->preparedQuery = $this->prepare('DELETE FROM pathsteps_groups WHERE pathstep_id=:pathstep_id AND group_id=:group_id');
                    $this->preparedQuery->bindValue(':pathstep_id', $this->param1, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':group_id', $this->param2, SQLITE3_INTEGER);
                    break;

                case 'pathstep':
                    $this->preparedQuery = $this->prepare('DELETE FROM pathsteps WHERE id=:id');
                    $this->preparedQuery->bindValue(':id', $this->param1, SQLITE3_INTEGER);
                    break;
                
                case 'path':
                    $this->preparedQuery = $this->prepare('DELETE FROM paths WHERE id=:id');
                    $this->preparedQuery->bindValue(':id', $this->param1, SQLITE3_INTEGER);
                    break;

                case 'author':
                    $this->preparedQuery = $this->prepare('DELETE FROM authors WHERE id=:id');
                    $this->preparedQuery->bindValue(':id', $this->param1, SQLITE3_INTEGER);
                    break;

                case 'document':
                    $this->preparedQuery = $this->prepare('DELETE FROM documents WHERE id=:id');
                    $this->preparedQuery->bindValue(':id', $this->param1, SQLITE3_INTEGER);
                    break;

            }
        } // EndIf for $request_method === 'DELETE'



        if ($this->requestMethod === 'PUT') {

            $receivedData = json_decode(file_get_contents("php://input"));

            switch($this->action) {

                case 'user':
                    $this->preparedQuery = $this->prepare('INSERT INTO 
                        users(username, password, is_admin, is_user, is_active, full_name, phone_number, email_address, additional_info) 
                        values(:username, :password, :is_admin, :is_user, :is_active, :full_name, :phone_number, :email_address, :additional_info)');

                    $this->preparedQuery->bindValue(':username', $receivedData->username, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':password', $receivedData->password, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':is_admin', $receivedData->is_admin, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':is_user',  $receivedData->is_user, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':is_active', $receivedData->is_active, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':full_name', $receivedData->full_name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':phone_number', $receivedData->phone_number, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':email_address', $receivedData->email_address, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':additional_info', $receivedData->additional_info, SQLITE3_TEXT);
                    break;

                case 'group':
                    $this->preparedQuery = $this->prepare('INSERT INTO groups(name) VALUES(:name)');
                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    break;

                case 'usergroup':
                    $this->preparedQuery = $this->prepare('INSERT INTO users_groups(user_id, group_id) VALUES(:user_id, :group_id)');
                    $this->preparedQuery->bindValue(':user_id', $receivedData->user_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':group_id', $receivedData->group_id, SQLITE3_INTEGER);
                    break;

                case 'path':
                    $this->preparedQuery = $this->prepare('INSERT INTO paths(name, info, can_receive) VALUES(:name, :info, :can_receive)');
                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':info', $receivedData->info, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':can_receive', $receivedData->can_receive, SQLITE3_TEXT);
                    break;
                
                case 'action':
                    $this->preparedQuery = $this->prepare('INSERT INTO actions(name) VALUES(:name)');
                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    break;

                case 'pathstep':
                    $this->preparedQuery = $this->prepare('INSERT INTO pathsteps(path_id, name, step_order, action_enter, action_next, action_archive, action_cancel, action_change)
                    VALUES(:path_id, :name, :step_order, :action_enter, :action_next, :action_archive, :action_cancel, :action_change) ');
                    $this->preparedQuery->bindValue(':path_id', $receivedData->path_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':step_order', $receivedData->step_order, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':action_enter', $receivedData->action_enter, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':action_next', $receivedData->action_next, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':action_archive', $receivedData->action_archive, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':action_cancel', $receivedData->action_cancel, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':action_change', $receivedData->action_change, SQLITE3_TEXT);
                    break;

                case 'pathstepgroup':
                    $this->preparedQuery = $this->prepare('INSERT INTO pathsteps_groups(pathstep_id, path_id, group_id) VALUES(:pathstep_id, :path_id, :group_id)');
                    $this->preparedQuery->bindValue(':pathstep_id', $receivedData->pathstep_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':path_id', $receivedData->path_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':group_id', $receivedData->group_id, SQLITE3_INTEGER);
                    break;

                case 'author':
                    $this->preparedQuery = $this->prepare('INSERT INTO 
                        authors(name, full_name, address, phone_number, email_address, additional_info) 
                        values(:name, :full_name, :address, :phone_number, :email_address, :additional_info)');

                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':full_name', $receivedData->full_name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':address', $receivedData->address, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':phone_number', $receivedData->phone_number, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':email_address', $receivedData->email_address, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':additional_info', $receivedData->additional_info, SQLITE3_TEXT);
                    break;

                case 'document':
                    $this->preparedQuery = $this->prepare('INSERT INTO 
                        documents(name, register, input_date, author_id, id_by_author, date_by_author, additional_info, ready, path_id, pathstep_id, assigned_user, closed, file_path, message) 
                        values(:name, :register, :input_date, :author_id, :id_by_author, :date_by_author, :additional_info, :ready, :path_id, :pathstep_id, :assigned_user, :closed, :file_path, :message)');

                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':register', $receivedData->register, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':input_date', $receivedData->input_date, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':author_id',  $receivedData->author_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':id_by_author', $receivedData->id_by_author, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':date_by_author', $receivedData->date_by_author, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':additional_info', $receivedData->additional_info, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':ready', $receivedData->ready, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':path_id', $receivedData->path_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':pathstep_id', $receivedData->pathstep_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':assigned_user', $receivedData->assigned_user, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':closed', $receivedData->closed, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':file_path', $receivedData->file_path, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':message', $receivedData->message, SQLITE3_TEXT);
                    break;

                case 'documenthistoryentry':
                    $this->preparedQuery = $this->prepare('INSERT INTO 
                        documents_history(document_id, user_id, user_name, operation_date, pathstep, action)
                        values(:document_id, :user_id, :user_name, :operation_date, :pathstep, :action)');

                    $this->preparedQuery->bindValue(':document_id', $receivedData->document_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':user_id', $receivedData->user_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':user_name', $receivedData->user_name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':operation_date',  $receivedData->operation_date, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':pathstep', $receivedData->pathstep, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':action', $receivedData->action, SQLITE3_TEXT);
                    break;

            }
        }  // EndIf for $request_method === 'PUT'




        if ($this->requestMethod === 'POST') {

            $receivedData = json_decode(file_get_contents("php://input"));

            switch($this->action) {

                case 'login':
                    $this->preparedQuery = $this->prepare('SELECT * FROM users WHERE username=:username and password=:password');

                    $this->preparedQuery->bindValue(':username', $receivedData->username, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':password', $receivedData->password, SQLITE3_TEXT);

                    break;

                case 'resetpassword':
                    
                    $this->preparedQuery = $this->prepare('UPDATE users SET password=:password WHERE id=:id');

                    $this->preparedQuery->bindValue(':password', $receivedData->password, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);
                    break;


                case 'user':

                    $this->preparedQuery = $this->prepare('UPDATE users SET 
                        full_name=:full_name,
                        phone_number=:phone_number,
                        email_address=:email_address,
                        additional_info=:additional_info,
                        is_user=:is_user,
                        is_admin=:is_admin,
                        is_active=:is_active
                        WHERE id=:id');

                    $this->preparedQuery->bindValue(':full_name', $receivedData->full_name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':phone_number', $receivedData->phone_number, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':email_address', $receivedData->email_address, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':additional_info', $receivedData->additional_info, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':is_user', $receivedData->is_user, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':is_admin', $receivedData->is_admin, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':is_active', $receivedData->is_active, SQLITE3_TEXT);

                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);

                    break;

                case 'group':
                    $this->preparedQuery = $this->prepare('UPDATE groups SET name=:name WHERE id=:id');

                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);
                    break;

                case 'path':
                    $this->preparedQuery = $this->prepare('UPDATE paths SET name=:name, info=:info, can_receive=:can_receive WHERE id=:id');

                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':info', $receivedData->info, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':can_receive', $receivedData->can_receive, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);
                    break;

                case 'pathstep':
                    $this->preparedQuery = $this->prepare('UPDATE pathsteps SET
                        name=:name,
                        step_order=:step_order,
                        action_enter=:action_enter,
                        action_next=:action_next,
                        action_archive=:action_archive,
                        action_cancel=:action_cancel,
                        action_change=:action_change
                        WHERE id=:id');
                    
                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':step_order', $receivedData->step_order, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':action_enter', $receivedData->action_enter, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':action_next', $receivedData->action_next, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':action_archive', $receivedData->action_archive, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':action_cancel', $receivedData->action_cancel, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':action_change', $receivedData->action_change, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);
                    break;

                case 'action':
                    $this->preparedQuery = $this->prepare('UPDATE actions SET name=:name WHERE id=:id');

                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);
                    break;

                case 'author':

                    $this->preparedQuery = $this->prepare('UPDATE authors SET
                        name =:name,
                        full_name = :full_name,
                        address = :address,
                        phone_number = :phone_number,
                        email_address = :email_address,
                        additional_info = :additional_info
                        WHERE id = :id');

                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':full_name', $receivedData->full_name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':address', $receivedData->address, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':phone_number', $receivedData->phone_number, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':email_address', $receivedData->email_address, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':additional_info', $receivedData->additional_info, SQLITE3_TEXT);

                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);

                    break;

                case 'document':

                    $this->preparedQuery = $this->prepare('UPDATE documents SET
                        name =:name,
                        register = :register,
                        input_date = :input_date,
                        author_id = :author_id,
                        id_by_author = :id_by_author,
                        date_by_author = :date_by_author,
                        additional_info = :additional_info,
                        ready = :ready,
                        path_id = :path_id,
                        pathstep_id = :pathstep_id,
                        assigned_user = :assigned_user,
                        closed = :closed,
                        file_path = :file_path,
                        message = :message
                        WHERE id = :id');

                    $this->preparedQuery->bindValue(':name', $receivedData->name, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':register', $receivedData->register, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':input_date', $receivedData->input_date, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':author_id',  $receivedData->author_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':id_by_author', $receivedData->id_by_author, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':date_by_author', $receivedData->date_by_author, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':additional_info', $receivedData->additional_infor, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':ready', $receivedData->ready, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':path_id', $receivedData->path_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':pathstep_id', $receivedData->pathstep_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':assigned_user', $receivedData->assigned_user, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':closed', $receivedData->closed, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':file_path', $receivedData->file_path, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':message', $receivedData->message, SQLITE3_TEXT);

                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);

                    break;

                case 'makedocumentready':

                    $this->preparedQuery = $this->prepare('UPDATE documents SET
                        ready = :ready,
                        assigned_user = NULL,
                        pathstep_id = :pathstep_id
                        WHERE id = :id');

                    $this->preparedQuery->bindValue(':ready', $receivedData->ready, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':pathstep_id', $receivedData->pathstep_id, SQLITE3_INTEGER);
                    break;

                case 'makedocumentassigned':

                    $this->preparedQuery = $this->prepare('UPDATE documents SET
                        assigned_user = :assigned_user
                        WHERE id = :id AND assigned_user IS NULL');
                    
                    $this->preparedQuery->bindValue(':assigned_user', $receivedData->assigned_user, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);
                    break;

                case 'makedocumentnotassigned':

                    $this->preparedQuery = $this->prepare('UPDATE documents SET
                    assigned_user = NULL
                    WHERE id = :id');
                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);
                    break;

                case 'actionnext':

                    $this->preparedQuery = $this->prepare('UPDATE documents SET
                    assigned_user = NULL,
                    pathstep_id = :pathstep_id,
                    message = :message
                    WHERE id = :id');

                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':pathstep_id', $receivedData->pathstep_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':message', $receivedData->message, SQLITE3_TEXT);
                    break;

                case 'actionarchive':

                    $this->preparedQuery = $this->prepare('UPDATE documents SET
                    assigned_user = NULL,
                    pathstep_id = :pathstep_id,
                    message = :message,
                    closed = :closed
                    WHERE id = :id');

                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':pathstep_id', $receivedData->pathstep_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':message', $receivedData->message, SQLITE3_TEXT);
                    $this->preparedQuery->bindValue(':closed', $receivedData->closed, SQLITE3_TEXT);
                    break;

                case 'actioncancel':

                    $this->preparedQuery = $this->prepare('UPDATE documents SET
                    assigned_user = NULL,
                    pathstep_id = :pathstep_id,
                    message = :message
                    WHERE id = :id');

                    $this->preparedQuery->bindValue(':id', $receivedData->id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':pathstep_id', $receivedData->pathstep_id, SQLITE3_INTEGER);
                    $this->preparedQuery->bindValue(':message', $receivedData->message, SQLITE3_TEXT);
                    break;


            }

        } // EndIf for $request_method === 'POST'



        if ($this->requestMethod === 'GET') {
        
            switch($this->action) {
            
                case 'login': 
                    $this->query_string = 'SELECT * FROM users WHERE username="'.$this->param1.'" and password="'.$this->param2.'" and is_active="TRUE"';
                    break;

                case 'users':
                    $this->query_string = 'SELECT * FROM users ORDER BY username';
                    break;

                case 'user':
                    $this->query_string = 'SELECT * FROM users WHERE id='.$this->param1;
                    break;

                case 'groups':
                    $this->query_string = 'SELECT * FROM groups ORDER BY name';
                    break;
                
                case 'group':
                    $this->query_string = 'SELECT * FROM groups WHERE id='.$this->param1;
                    break;

                case 'paths':
                    $this->query_string = 'SELECT * FROM paths ORDER BY name';
                    break;

                case 'path':
                    $this->query_string = 'SELECT * FROM paths WHERE id='.$this->param1;
                    break;

                case 'usergroups':
                    $this->query_string = 'SELECT groups.id, groups.name FROM groups 
                        LEFT JOIN users_groups
                        ON groups.id = users_groups.group_id
                        WHERE users_groups.user_id = '.$this->param1.'
                        ORDER BY groups.name';
                    break;

                case 'pathstepgroups':
                    $this->query_string = 'SELECT groups.id, groups.name, pathsteps_groups.pathstep_id FROM groups
                        LEFT JOIN pathsteps_groups
                        ON groups.id = pathsteps_groups.group_id
                        WHERE pathsteps_groups.path_id = '.$this->param1.'
                        ORDER BY pathsteps_groups.pathstep_id, groups.name';
                    break;

                case 'notpathstepgroups':
                    $this->query_string = 'SELECT groups.id, groups.name
                        FROM groups
                        WHERE id NOT IN (SELECT group_id from pathsteps_groups WHERE pathstep_id = '.$this->param1.' and group_id IS NOT NULL)
                        ORDER BY groups.name';
                    break;

                case 'notusergroups':
                    $this->query_string = 'SELECT groups.id, groups.name 
                        FROM groups
                        WHERE id NOT IN (SELECT group_id FROM users_groups WHERE user_id = '.$this->param1.' and group_id IS NOT NULL)
                        ORDER BY groups.name';
                    break;

                case 'groupusers':
                    $this->query_string = 'SELECT users.id, users.username, users.password, users.full_name, users.phone_number, users.email_address, users.additional_info, users.is_admin, users.is_user, users.is_active
                        FROM users
                        LEFT JOIN users_groups
                        ON users.id = users_groups.user_id
                        WHERE users_groups.group_id = '.$this->param1.'
                        ORDER BY users.username';
                    break;

                case 'notgroupusers':
                    $this->query_string = 'SELECT users.id, users.username, users.password, users.full_name, users.phone_number, users.email_address, users.additional_info, users.is_admin, users.is_user, users.is_active
                        FROM users
                        WHERE id NOT IN (SELECT user_id FROM users_groups WHERE group_id = '.$this->param1.' and user_id IS NOT NULL)
                        ORDER BY users.username';
                    break;

                case 'pathsteps':
                    $this->query_string = 'SELECT id, path_id, name, step_order, action_enter, action_next, action_archive, action_cancel, action_change
                        FROM pathsteps
                        WHERE path_id = '.$this->param1.'
                        ORDER BY step_order';
                    break;

                case 'pathstep':
                    $this->query_string = 'SELECT id, path_id, name, step_order, action_enter, action_next, action_archive, action_cancel, action_change FROM pathsteps WHERE id='.$this->param1;
                    break;

                case 'pathstepscount':
                    $this->query_string = 'SELECT COUNT(*) FROM pathsteps WHERE path_id='.$this->param1;
                    break;
            
                case 'actions':
                    $this->query_string = 'SELECT * FROM actions ORDER BY name';
                    break;
                
                case 'action':
                    $this->query_string = 'SELECT * FROM actions WHERE id='.$this->param1;
                    break;

                case 'authors':
                    $this->query_string = 'SELECT * FROM authors ORDER BY name';
                    break;

                case 'author':
                    $this->query_string = 'SELECT * FROM authors WHERE id='.$this->param1;
                    break;

                case 'entrypathstepgroups':
                    $this->query_string = 'SELECT pathsteps_groups.id, pathsteps_groups.pathstep_id, pathsteps_groups.group_id, pathsteps_groups.path_id, paths.name 
                        FROM paths
                        LEFT JOIN pathsteps_groups
                        ON paths.id = pathsteps_groups.path_id
                        WHERE pathsteps_groups.pathstep_id IN (SELECT id from pathsteps WHERE pathsteps.action_enter = "TRUE" and id IS NOT NULL)
                        ORDER BY paths.name';
                    break;

                case 'document':
                    $this->query_string = 'SELECT * FROM documents WHERE id='.$this->param1;
                    break;

                case 'documentsnotready':
                    $this->query_string = 'SELECT * FROM documents WHERE ready = "FALSE" and assigned_user='.$this->param1.' order by input_date, id';
                    break;

                case 'documenthistory':
                    $this->query_string = 'SELECT * FROM documents_history WHERE document_id='.$this->param1.' ORDER BY id';
                    break;

                case 'documentsnotreadycount':
                    $this->query_string = 'SELECT COUNT(*) FROM documents WHERE ready = "FALSE" and assigned_user='.$this->param1;
                    break;

                case 'documentsnotassigned':
                    $this->query_string = 'SELECT * 
                    FROM documents
                    WHERE documents.assigned_user IS NULL
                    AND documents.pathstep_id IN 
                    ( SELECT pathstep_id FROM pathsteps_groups 
                        WHERE group_id IN (SELECT group_id FROM users_groups WHERE user_id='.$this->param1.' AND group_id IS NOT NULL)
                        AND pathstep_id IS NOT NULL)
                    ORDER BY input_date, id';
                    break;

                case 'documentsnotassignedcount':
                    $this->query_string = 'SELECT COUNT(*) 
                    FROM documents 
                    WHERE documents.assigned_user IS NULL
                    AND documents.pathstep_id IN 
                    ( SELECT pathstep_id FROM pathsteps_groups 
                        WHERE group_id IN (SELECT group_id FROM users_groups WHERE user_id='.$this->param1.' AND group_id IS NOT NULL)
                        AND pathstep_id IS NOT NULL)';
                    break;

                case 'documentsassigned':
                    $this->query_string = 'SELECT * FROM documents WHERE documents.ready="TRUE" and documents.assigned_user='.$this->param1.' ORDER BY input_date, id';
                    break;

                case 'documentsassignedcount':
                    $this->query_string = 'SELECT COUNT(*) FROM documents WHERE documents.ready="TRUE" and documents.assigned_user='.$this->param1.' ORDER BY input_date, id';
                    break;

                case 'nextpathstep':
                    $this->query_string = 'SELECT id FROM pathsteps
                    WHERE path_id = '.$this->param1.' AND
                    step_order > (SELECT step_order FROM pathsteps WHERE id = '.$this->param2.')
                    ORDER BY step_order
                    LIMIT 1';
                    break;

                case 'prevpathstep':
                    $this->query_string = 'SELECT id FROM pathsteps
                    WHERE path_id = '.$this->param1.' AND
                    step_order < (SELECT step_order FROM pathsteps WHERE id = '.$this->param2.') AND
                    step_order > 1
                    ORDER BY step_order DESC
                    LIMIT 1';
                    break;

            }
        } // EndIf for $request_method === 'GET'
    }

    function generateResponse() {
        
        $full_response = new \stdClass();

        $full_response->status = $this->response_status;
        $full_response->message = $this->response_message;

        $results = false;
       

        // response for GET
        if ($this->requestMethod === 'GET') {
        
            $select_result = $this->query($this->query_string);

            while ($row = $select_result->fetchArray()) {
                $results[] = $row;
            }
            $full_response->data = $results;
            $this->sendHeaders();
            $resultJSON = json_encode($full_response);
            echo $resultJSON;

        // response for everything else except GET and OPTIONS
        } else {

            $select_result = $this->preparedQuery->execute();

            // if POST and action = login -----------------------------

            if (($this->requestMethod === 'POST') and ($this->action === 'login')) {
                while ($row = $select_result->fetchArray()) {
                    $results[] = $row;
                }
                
                $full_response->data = $results;
                
                if ($results !== false) { $full_response->status = 'OK'; }

                if (!$results) { 
                    $full_response->status = 'ERROR'; 
                    $full_response->message = 'Niepoprawna nazwa użytkownika lub hasło. Spróbuj ponownie...';
                }

                if ($results and $full_response->data[0]['is_admin'] !== 'TRUE' and $full_response->data[0]['is_user'] !== 'TRUE') {
                    $full_response->status = 'ERROR'; 
                    $full_response->message = 'Brak nadanych uprawnień. Skontaktuj się z administratorem.';
                }

                if ($results and $full_response->data[0]['is_active'] !== 'TRUE') {
                    $full_response->status = 'ERROR'; 
                    $full_response->message = 'Konto jest nieaktywne. Skontaktuj się z administratorem.';
                }

            }


            if (($this->requestMethod === 'POST') and ($this->action !== 'login')) {
                
                $full_response->status = 'OK';

                if (!$select_result) {
                    $full_response->status = 'ERROR';
                    $full_response->message = 'akcja zakończyła się błędem: '.$this->action;
                }
            }


            if ($this->requestMethod === 'PUT') {
                
                $full_response->status = 'OK';

                if (!$select_result) {
                    $full_response->status = 'ERROR';
                    $full_response->message = 'akcja zakończyła się błędem: '.$this->action;
                }
            }


            if ($this->requestMethod === 'DELETE') {
                
                $full_response->status = 'OK';

                if (!$select_result) {
                    $full_response->status = 'ERROR';
                    $full_response->message = 'akcja zakończyła się błędem: '.$this->action;
                }
            }

            $this->sendHeaders();
            $resultJSON = json_encode($full_response);
            echo $resultJSON;
            
        }
    }


    function sendHeaders() {
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
            // you want to allow, and if so:
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Credentials: true");
            header("Access-Control-Max-Age: 86400");    // cache for 1 day
        }     
    }

    // test functions ====================================================================================================
    
    function echoParams() {
        echo($this->requestMethod.' - '.$this->action.' / '.$this->param1.' / '.$this->param2);
    }
}



    $database = new DocFlowAPI();

    $database->setRequestMethod($_SERVER['REQUEST_METHOD']);


    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['action'])) { $database->setAction($_GET['action']); }
        if (isset($_GET['param1'])) { $database->setParam1($_GET['param1']); }
        if (isset($_GET['param2'])) { $database->setParam2($_GET['param2']); }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_GET['action'])) { $database->setAction($_GET['action']); }
        if (isset($_GET['param1'])) { $database->setParam1($_GET['param1']); }
        if (isset($_GET['param2'])) { $database->setParam2($_GET['param2']); }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        if (isset($_GET['action'])) { $database->setAction($_GET['action']); }
        if (isset($_GET['param1'])) { $database->setParam1($_GET['param1']); }
        if (isset($_GET['param2'])) { $database->setParam2($_GET['param2']); }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        if (isset($_GET['action'])) { $database->setAction($_GET['action']); }
        if (isset($_GET['param1'])) { $database->setParam1($_GET['param1']); }
        if (isset($_GET['param2'])) { $database->setParam2($_GET['param2']); }
    }

// generujemy response

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        $database->sendHeaders();
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
        $database->generateQueryString();
        $database->generateResponse();
    }
    
    
//$database->echoParams();

?>

