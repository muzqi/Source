import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { logout } from '@/actions/loginAction'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

function generateLayout() {
  return _.map(_.range(0, 3), (item, i) => {
    let y = Math.ceil(Math.random() * 4) + 1
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    }
  })
}

@connect(null)
class AppHomeContainer extends Component {
  static defaultProps = {
    className: 'layout',
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: {
      lg: 12,
      md: 10,
      sm: 6,
      xs: 4,
      xxs: 2
    },
    initialLayout: generateLayout()
  }

  state = {
    currentBreakpoint: 'lg',
    compactType: 'vertical',
    mounted: false,
    layouts: {
      lg: this.props.initialLayout
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true
    })
  }

  generateDOM() {
    return _.map(this.state.layouts.lg, (l, i) => {
      return (
        <div key={i} className={l.static ? 'static' : ''} 
          style={{border: '1px solid', background: '#ccc'}}>
          {
            l.static
            ?
            (
              <span className='text' title='this item is static and cannot be removed or resized'>
                Static - {i}
              </span>
            )
            :
            <span className='text'>{i}</span>
          }
        </div>
      )
    })
  }

  onBreakpointChange= breakpoint => {
    console.log('breakpoint', breakpoint)
    this.setState({
      currentBreakpoint: breakpoint
    })
  }

  onCompactTypeChange = () => {
    const { compactType: oldCompactType } = this.state
    const compactType = 
      oldCompactType === 'horizontal' ? 'vertical'
      : oldCompactType === 'vertiacl' ? null : 'horizontal'
    this.setState({
      compactType
    })
  }

  onLayoutChange = (layout, layouts) => {
    console.log(layout, layouts)
    this.props.onLayoutChange(layout, layouts)
  }

  onNewLayout = () => {
    this.setState({
      layouts: {
        lg: generateLayout()
      }
    })
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch(logout())
  }

  render() {
    return (
      <div>
        App Home Page
        <div>
          Current Breakpoint: {this.state.currentBreakpoint}
          ({
            this.props.cols[this.state.currentBreakpoint]
          }
          {'***'}
          columns
          )
        </div>
        <div>
          Compaction type: {' '}
          {
            _.capitalize(this.state.compactType) || 'no compaction'
          }
        </div>
        <button onClick={this.onNewLayout}>Generate New  Layout</button>
        <button onClick={this.onCompactTypeChange}>
          Change Compaction Type
        </button>
        <ResponsiveReactGridLayout 
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
          >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
        <br /><br />
        <Button type='danger' onClick={ this.logout }>Logout</Button>
      </div>
    )
  }
}

export default AppHomeContainer
