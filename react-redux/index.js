
// <Provider store={store}>

// 使用的时候

// connect(mapStateToProps)(App)

// Provider 定义
class Provider extends Component {
	static childContextTypes = {
		store:proptypes.isRequired
	}
	getChildContext() {
		return { store: this.state.store}
	}
	constructor(props, context){
		super(props, context)
		this.state = { store: props.store}
	}
	render(){
		return this.props.children
	}
}

// connect 定义
function connect(select){
	return DecoratedComponent => class ConnectorDecorator extends Component{
		render(){
			return (
				<Connector select={state => select(state,this.props)}>
					{ stuff => <DecoratedComponent {...stuff} {...this.props} />}
				</Connector>
				)
		}
	}
}

// Connector 定义

class Connector extends Component {
	static contextTypes = {
		store: proptypes.object
	}
	constructor(props,context){
		super(props,context)
		this.state = this.selectState(props,context)
	}
	// mapStateToProps (state) => ({a:state.a, b:state.b})
	selectState(props,context){
		const state = context.store.getState()
		const slice = props.select(state)
		return { slice }
	}
	render(){
		const { children } = this.props
		const { slice } = this.state
		const { store: { dispatch } } = this.context
		return children({dispatch,...slice})
	}
}























