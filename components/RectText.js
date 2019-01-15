import React, { Component } from 'react'
import { TextInput,View,StyleSheet,Text} from 'react-native'
import PropTypes from 'prop-types'

import componentStyle from './style/component'

export default class RectText extends Component {
  static propTypes = {
    text: PropTypes.string,
  }
  static defaultProps = {
    text: '',
  }
  render = () => {
    const { text } = this.props
    return (
      <View style = {Styles.views}>
        <Text style = {Styles.text}>{text}</Text>
      </View>
    )
  }
}
const Styles = StyleSheet.create({
  views: {
    height: 30,
    borderRadius: 45,
    backgroundColor: '#20c2ff',
    justifyContent: 'center'
  },
  text: {
    color: '#000000',
    fontSize: 20,
    alignSelf: 'center'
  }
})
