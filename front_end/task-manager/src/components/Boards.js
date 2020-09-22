import React from 'react';
import CreateBoard from './CreateBoard'

class Board extends React.Component {

    render(){
        return (
        <div className="board-layout">
            <div className="board-introduction">
                <div className="intro-content">
                    <p>Create, Join, and Manage boards</p>
                </div>
            </div>
            
            <div className="board-create">
                <CreateBoard />
                
                <div className="b-create-content">
                    <p>Content over here</p>
                </div>
            </div>
        
            <div className="board-join">
                <h1>Hello</h1>
            </div>
        </div>
        )
    }
}

export default Board;