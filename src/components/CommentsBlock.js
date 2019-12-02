import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUser, isLogged } from '../services/loginService'
import commentsService from '../services/commentsService'
import { withRouter } from "react-router";

class CommentsBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comment: '',
            comments: [],
            isLogged: isLogged(),
            user: getUser()
        }
    }

    componentWillMount() {
        this.setState({
            comments: commentsService.get(this.props.match.params.recipe)
        })

    }


    handleChange = e => {
        this.setState({
            comment: e.target.value
        })

    }

    insertComment = e => {
        e.preventDefault()
        commentsService.insert(this.props.match.params.recipe,
            { comment: this.state.comment })
        this.setState({
            comment: '',
            comments: commentsService.get(this.props.match.params.recipe)
        })

    }

    deletecomment = (elem) => {
        commentsService.delete(this.props.match.params.recipe, elem)
        this.setState({
            comments: commentsService.get(this.props.match.params.recipe)
        })
    }


    renderComment = (elem, index) => {

        let trash;
        if (this.state.isLogged && this.state.user.username === elem.author) {
            trash = <button onClick={() => this.deletecomment(elem)}>
                <FontAwesomeIcon icon="trash" />
            </button>
        }

        return (
            <div key={index} className="Comment media text-muted pt-3">
                <FontAwesomeIcon className="mr-2" size="3x" icon="user-circle" />
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <strong className="d-block text-gray-dark">{elem.author}</strong>
                    {elem.comment}
                </p>

                {trash}

            </div>)



    }


    render() {

        return (
            <div className="text-left">
                <div className="my-3 p-3 bg-white rounded shadow-sm">
                    <h6 className="border-bottom border-gray pb-2 mb-0">
                        Comments
                    </h6>

                    {this.state.comments.map((elem, index) =>
                        this.renderComment(elem, index))}

                </div>
                <form onSubmit={this.insertComment}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                            Comment
                        </label>
                        <textarea
                            disabled={this.state.isLogged ? false : true}
                            value={this.state.comment}
                            onChange={this.handleChange}
                            required="required"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Insert your comment here"
                        />
                    </div>

                    <button
                        disabled={this.state.isLogged ? false : true}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                </form>

            </div>
        )
    }
}

export default withRouter(CommentsBlock)