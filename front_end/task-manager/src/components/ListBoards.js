//React
import React from 'react';
//Redux
import {connect} from 'react-redux';
import {getBoards} from '../store/actions/boards';
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

class ListBoards extends React.Component{

    componentDidMount(){
        this.props.getBoards()
    }

    handleArrowClick = (id) => {
        const icon = document.querySelector(`[data-key="${id}"]`)
        const content = icon.querySelector('.content')
        console.log(content)
        icon.classList.toggle('open')
        if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
    }

    render(){
        return(
            <div className='board-list' id='board-list'>
                {this.props.boards.map(board => (
                    <ul key={board.id} data-key={board.id} style={{'listStyleType': 'none', 'padding': '10px'}}>
                        <li>{board.title}</li>
                        <li>{board.creator}</li>
                        <FontAwesomeIcon icon={faArrowAltCircleDown} onClick={()=> this.handleArrowClick(board.id)}/>
                        <li className='content'>
                            <ul>
                                <li>
                                    {board.key}
                                </li>
                            </ul>
                        </li>
                    </ul>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    boards: state.boards.boards
})

export default connect(mapStateToProps, {getBoards})(ListBoards);