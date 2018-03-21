import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { Link } from 'react-router-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { loggedOut } from '../../redux/actions'

class Welcome extends Component {

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) console.log('welcome component',nextProps)
    }

    render() {
        console.log(this.props)
        const { loggedIn, user } = this.props
        let content = null
        const loggedOutContent = <View><Text>Not logged in.</Text></View>
        content = loggedIn ? <View><Text>{`Welcome ${user.name}`}</Text></View> : loggedOutContent
        return (
            <View>
                <Text>Welcome page</Text>
                {content}
                <Button title="Go to Login" onPress={() => this.props.history.push('/login')} />
                <TouchableHighlight style={styles.mybtn} onPress={this.logout.bind(this)}><Text style={styles.btnText}>Logout</Text></TouchableHighlight>
            </View>
        )
    }

    logout() {
        console.log('clicked logout')
        this.props.dispatchLogout()
        this.props.history.push('/login')
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchLogout: () => dispatch(loggedOut())
    }
}

const styles = StyleSheet.create({
    mybtn: {
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: 'teal',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center'
    },
    btnText: {
        color: 'whitesmoke'
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Welcome)