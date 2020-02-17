import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

import Background from '../components/Background';
import StandardButton from '../components/StandardButton';
import Colors from '../constants/Colors';
import EditIcon from '../constants/EditIcon';

const QuestionScreen = props => {
    const item = props.navigation.getParam('question');

    const [question, setQuestion] =  item ? useState(item.question) : useState('');
    const [answer, setAnswer] = item ? useState(item.answer) : useState('');

    return(
        <Background>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={styles.screen}>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Question"
                            placeholderTextColor='white'   
                            onChangeText={(text) => setQuestion(text)}
                            value={question}
                        />
                        <EditIcon/>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Answer"
                            placeholderTextColor='white'
                            onChangeText={(text) => setAnswer(text)}
                            value={answer}
                        />
                        <EditIcon/>
                    </View>
                    <StandardButton
                        text="Save"
                        onTap={()=> {
                            if(item){
                                props.navigation.state.params.edit(item.id,question, answer);
                                props.navigation.state.params.refresh();
                                props.navigation.pop();
                            }
                            else{
                                props.navigation.state.params.add(question, answer);
                                props.navigation.state.params.refresh();
                                props.navigation.pop();
                            }
                        }}
                        containerStyle={{width:'85%'}}
                    />
                </View>
            </TouchableWithoutFeedback>
        </Background>
    );
};

QuestionScreen.navigationOptions = (navData) => {
    return{
        headerTitle: 'Question',
        headerLeftContainerStyle: {
            backgroundColor: Colors.accentColor,
        },
        headerLeft: () => (
               <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title="Menu" 
                        iconName="md-menu" 
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    inputFieldContainer: {
        backgroundColor: 'rgba(0,0,0, 0.4)',
        width: '85%',
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10
    },
    inputField: {
        color: 'white',
        fontSize: 20
    }
});

export default QuestionScreen;