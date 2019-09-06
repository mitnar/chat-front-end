import React from "react";
import PropTypes from "prop-types";

function UserListView({
    users
}) {

    const userList = users.map((user, index) => {
        return <div key={index}>{user.user}</div>
    });

    return (
        <div>
            {userList.length > 0 ?
                'Подписаны на обновления чата:' :
                'Никто не подписан на обновления чата'
            }
            {userList}
        </div>
    )
}

UserListView.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserListView;