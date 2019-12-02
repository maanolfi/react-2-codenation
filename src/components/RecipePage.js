import React from 'react'
import PropTypes from 'prop-types'
import CommentsBlock from './CommentsBlock'

const RecipePage = ({
    recipe
}) => {

    return (
        recipe !== undefined ?
            <div>
                <div>
                    <img className="card-img-top img-fluid" src={recipe.thumbnail} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{recipe.title}</h5>
                        <p className="card-text">
                            <strong>Ingredients: </strong>{recipe.ingredients}
                        </p>
                    </div>
                </div>


                <CommentsBlock />
            </div> : null

    )
}

RecipePage.propTypes = {
    recipe: PropTypes.object
}

export default RecipePage


