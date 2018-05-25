import React from 'react';
import {addQuestion} from '../../Action/action';
import {getItemFromLocalStorage, setItemInLocalStorage} from '../../initializeAppData';

export default class QuestionBuilderComponent extends React.Component
{
    state = {
        'typeOfQuestion':'mcq',
        'title':'',
        'description':'',
        'instructions':'',
        'options':[],
        'correctAnswer':''
    }

    onTypeChange = (e)=>
    {
        this.setState({
            'typeOfQuestion':e.target.value
        });
    }

    onTitleChange = (e)=>
    {
        this.setState({
            'title':e.target.value
        });
    }

    onDescriptionChange = (e)=>
    {
        this.setState({
            'description':e.target.value
        });
    }

    onInstructionChange = (e)=>
    {
        this.setState({
            'instructions':e.target.value
        });
    }

    handleCorrectAnswer = (e) =>
    {
        this.setState({
            correctAnswer:e.target.value
        });
    }

    handleMcqInput = (e)=>
    {
        let id = e.target.getAttribute('id');

        let options = this.state.options, indexP;

        let optionToAdd;

        let idOption = options.filter((option,index) => {
            if(option.id===id)
            {
                indexP=index;
                return true;
            }

            return false;
        });

        if(idOption.length)
        {
            options.splice(indexP,1);

            idOption[0].value = e.target.value;

            optionToAdd = idOption[0];
        }
        else
        {
            optionToAdd = {
                id:id,
                value:e.target.value
            };
        }

        if(options.length)
        {
            this.setState({
                'options':[...options,optionToAdd]
            });
        }
        else {
            this.setState({
                'options':[optionToAdd]
            });
        }


    }

    getQuestionOptions = ()=>
    {
        if(this.state.typeOfQuestion==='mcq')
        {
            return (
                <div className='mcqContainer'>
                    <div className='mcqRow'>
                        <div className='mcqOption newQuestionHeader height60'>Answer Options : </div>
                        <div className='mcqRadio newQuestionHeader'>Right answer</div>
                    </div>
                    <div className='mcqRow'>
                        <input placeholder='Type option A here' onChange={this.handleMcqInput} className='textInput mcqOption' type='text' id='1'/>
                        <span className='mcqRadio'>
                            <input type='radio' name='mcq' value='1' selected={this.state.answer} onChange={this.handleCorrectAnswer} />
                        </span>
                    </div>
                    <div className='mcqRow'>
                        <input placeholder='Type option B here' type='text' onChange={this.handleMcqInput} id='2' className='textInput mcqOption'/>
                        <span className='mcqRadio'>
                            <input type='radio' name='mcq' value='2' selected={this.state.answer} onChange={this.handleCorrectAnswer} />
                        </span>
                    </div>
                    <div className='mcqRow'>
                        <input placeholder='Type option C here' type='text' onChange={this.handleMcqInput} id='3' className='textInput mcqOption'/>
                        <span className='mcqRadio'>
                            <input type='radio' name='mcq' value='3' selected={this.state.answer} onChange={this.handleCorrectAnswer} />
                        </span>
                    </div>
                    <div className='mcqRow'>
                        <input placeholder='Type option D here' type='text' onChange={this.handleMcqInput} id='4' className='textInput mcqOption'/>
                        <span className='mcqRadio'>
                            <input type='radio' name='mcq' value='4' selected={this.state.answer} onChange={this.handleCorrectAnswer} />
                        </span>
                    </div>
                </div>
            )
        }
        else if(this.state.typeOfQuestion==='stq')
        {
            return null;
        }
        else if(this.state.typeOfQuestion==='ptq')
        {
            return (
                <div>
                    <div className='newQuestionHeader'>Ideal answer</div>
                    <input type='text' placeholder='Type your answer here' className='textInput' value={this.state.correctAnswer} onChange={this.handleCorrectAnswer} />
                </div>
            )
        }
        else
        {
                return null;
        }
    }

    adminPage = ()=>
    {
        this.props.history.push('/admin');
    }

    saveAndMoveToAdmin = ()=>
    {
        let {title, description, typeOfQuestion, options, correctAnswer, instructions} = this.state;

        if(!title || !description)
        {
            alert('Kindly fill the options');

            return;
        }
        else
        {
            if(typeOfQuestion==='mcq' && (!options.length || options.length<4 || !correctAnswer))
            {
                alert('Kindly fill the options for MCQ');

                return;
            }
            else if(typeOfQuestion ==='ptq' && !correctAnswer)
            {
                alert('Kindly fill give the ideal answer');

                return;
            }
        }

        let questionId = getItemFromLocalStorage('questionId');

        setItemInLocalStorage('questionId',questionId+1)

        let questionData = {
            'id':'ques'+(questionId+1),
            'title':title,
            'description':description,
            'instructions':instructions,
            'typeOfQuestion':typeOfQuestion,
            'options':options,
            'correctAnswer':correctAnswer
        }

        this.props.store.dispatch(addQuestion(questionData));

        this.props.history.push('/admin');
    }

    render()
    {
        let {typeOfQuestion, title, description, instructions} = this.state;

        return (
            <div className='questionBuilderContainer'>
                <div className='questionBuilderInnerContainer'>
                    <div>Question Builder</div>
                    <div className='questionTypeContainer'>
                        <div className='questionTypeItem questionTypeHeader'>What type of question you want to create?</div>
                        <label className='questionTypeItem'>
                            <input className='inputRadio30' type='radio' defaultChecked selected={typeOfQuestion} onChange={this.onTypeChange} value='mcq' name='questionType' />
                            <span className='textForQuestionType'>Multiple Choice Question</span>
                        </label>
                        <label className='questionTypeItem'>
                            <input className='inputRadio30' type='radio' selected={typeOfQuestion} onChange={this.onTypeChange} value='stq' name='questionType' />
                            <span className='textForQuestionType'>Submission Type Question</span>
                        </label>
                        <label className='questionTypeItem'>
                            <input className='inputRadio30' type='radio' selected={typeOfQuestion} onChange={this.onTypeChange} value='ptq' name='questionType' />
                            <span className='textForQuestionType'>Passage Type Question</span>
                        </label>
                    </div>
                    <div>
                        <div className='marginTopBottom20'>
                            <div className='newQuestionHeader'>Question Title : </div>
                            <input required placeholder='Type your question title here . .' className='textInput' type='text' value={title} onChange={this.onTitleChange} />
                        </div>
                        <div className='marginTopBottom20'>
                            <div className='newQuestionHeader'>Question Description : </div>
                            <textarea required placeholder='Type your question description here . .' className='textArea' value={description} onChange={this.onDescriptionChange}></textarea>
                        </div>
                        <div>
                            {this.getQuestionOptions()}
                        </div>
                        <div className='marginTopBottom20'>
                            <div className='newQuestionHeader'>Instructions : </div>
                            <input placeholder='Type instructions here . . (eg: file size, file forma, etc )' className='textInput' type='text' value={instructions} onChange={this.onInstructionChange}/>
                        </div>
                    </div>
                </div>
                <div className='authorCancelContainer'>
                    <div className='inforForAuthorQuestion'>Click author to create a new question and will be added automatically to the question list</div>
                    <button className='cancel' onClick={this.adminPage}>Cancel</button>
                    <button className='saveAuthor' onClick={this.saveAndMoveToAdmin}>Author</button>
                </div>
            </div>
        );
    }
}
