import React from "react";
import PropTypes from 'prop-types';

function ButtonsPanelView({
    joinToRoom,
    leaveRoom
}) {

    return (
        <div>
            <button onClick={joinToRoom}>Подписаться</button> <br/>
            <button onClick={leaveRoom}>Отписаться</button>
        </div>
    )
}

ButtonsPanelView.propTypes = {
    joinToRoom: PropTypes.func
};

export default ButtonsPanelView;