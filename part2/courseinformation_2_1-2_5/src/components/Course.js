import Header from './Header'
import Content from './Content'
import React from 'react'

const Course = props => {


    return (
        <>
        <h1>Web development curriculum</h1>
        {
            props.courses.map(
                course => {
                    return (
                        <React.Fragment key={course.id}>
                            <Header  course={ course.name }/> 
                            <Content  parts={ course.parts }/>
                        </React.Fragment>
                    )
                }
            )
        }
        </>
    )
}

export default Course