import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next'; // See: https://github.com/jamiebuilds/unstated-next
import { Map, fromJS } from 'immutable';

export default createContainer(() => {
    const [questionData, setQuestionData] = useState(Map());
    const [regisrationData, setRegistrationData] = useState(Map());
    return {
        updateAnswer(id, question, answer) {
            setQuestionData(questionData.set(id, Map({
                question, answer
            })));            
        },
        getQuestionDataRawObj() {
            return questionData.toJS();
        },
        updateRegistrationData(data) {
            let regData = fromJS(data);
            setRegistrationData(regData);
        },
        getRawRegistrationData() {
            return regisrationData.toJS();
        }
    };
});