import React, { useState, Fragment, useEffect } from 'react';

import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  removeElements,
  ReactFlowProvider,
} from 'react-flow-renderer';

/*const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Mind Node' },
    position: { x: 0, y: 0 },
  },
];*/

let timer;

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          Welcome to <strong>React Flow!</strong>
        </>
      ),
    },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: (
        <>
          This is a <strong>default node</strong>
        </>
      ),
    },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: (
        <>
          This one has a <strong>custom style</strong>
        </>
      ),
    },
    position: { x: 400, y: 100 },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
  },
  {
    id: '4',
    position: { x: 250, y: 200 },
    data: {
      label: 'Another default node',
    },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
  },
  {
    id: '5',
    data: {
      label: 'Node id: 5',
    },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
    position: { x: 250, y: 325 },
  },
  {
    id: '6',
    type: 'output',
    data: {
      label: (
        <>
          An <strong>output node</strong>
        </>
      ),
    },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
    position: { x: 100, y: 480 },
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Another output node' },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
    position: { x: 400, y: 450 },
  },
  { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', source: '1', target: '3' },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    label: 'animated edge',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    arrowHeadType: 'arrowclosed',
    label: 'edge with arrow head',
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    label: 'smooth step edge',
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'step',
    style: { stroke: '#f6ab6c' },
    label: 'a step edge',
    animated: true,
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
  },
];
let steps = [];
let currentStep = -1;



const MindNode = () => {
  const [elements, setElements] = useState(initialElements);
  const [name, setName] = useState('');

  const setKeys = () =>{
    steps = []
    console.log('WAIT what is elements',elements)
    elements.map(x => {
      if (!x.source) {
        steps.push(x.id);
      }
    });
    console.log('OK what is steps now',steps)
  }

  useEffect(() => {
    console.log('USE EFFECT CALLED');
    setKeys()
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;
  }, []);

  const onChange = elements => {
    console.log('WEE elements', elements);
    setElements(elements);
    console.log('onChange', elements);
  };

  const onLoad = reactFlowInstance => {
    reactFlowInstance.fitView();
  };

  const onElementsRemove = elementsToRemove => {
    console.log('INSIDE onElementsRemove');
    onChange(removeElements(elementsToRemove, elements));
  };

  const onConnect = params => {
    console.log('INSIDE onConnect');
    onChange(addEdge(params, elements));
  };

  //const onConnect = params => setElements(e => addEdge(params, e));

  const onSelectionDragStop = (params, nodes) => {
    console.log('INSIDE onSelectionDragStop');
    onChange([...removeElements(nodes, elements), ...nodes]);
  };

  const onNodeDragStop = (params, node) => {
    console.log('INSIDE onNodeDragStop');
    onChange(
      elements.map(element => (element.id === node.id ? node : element)),
    );
  };

  const addNode = () => {
    setElements(e => {
          let e2 = e.concat({
            id: (e.length + 1).toString(),
            data: {label: `${name}`},
            position: {
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            },
            style: {
              background: '#D6D5E6',
              color: '#333',
              border: '1px solid #222138',
              width: 180,
            }
          })
      return e2
        }
    );
    console.log('BEFORE elements',elements)
    setKeys()
  };

  const onElementClick = (event, element) => {
    console.log('INSIDE onElementClick', element);
  };

  const nice = () => {
    currentStep = -1
    timer = setInterval(() => {
      currentStep++;


      if (currentStep <= steps.length ) {
        //console.log('WHAT IS currentStep', currentStep);

        //console.log('vs steps.length', steps.length);
        //console.log('vs steps[steps.length-1]', steps[steps.length-1]);
        //console.log('for steps', steps);


        let newElements = elements.map(element => {
          if (element && element.style && element.style.background) {
            console.log('~~')
            console.log('currentStep:'+currentStep)
            console.log('steps[currentStep]:'+steps[currentStep])
            if (steps[currentStep]) {
              if (element.id === steps[currentStep]) {
                console.log('_____')
                console.log('COMPARING element.id:'+element.id+' vs steps['+currentStep+']:'+steps[currentStep])


                element.style.background =
                    '#' + Math.floor(Math.random() * 16777215).toString(16);
              } else {
                element.style.background = '#eee';
              }
            }
          }
          return element;
        });
        onChange(newElements);
      } else {
        clearInterval(timer);
      }
    }, 1000);

  };

  const notNice = () => {
    clearInterval(timer);
  };
  return (
    <Fragment>
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          onLoad={onLoad}
          style={{ width: '100%', height: '90vh' }}
          onConnect={onConnect}
          connectionLineStyle={{ stroke: '#ddd', strokeWidth: 20 }}
          connectionLineType="SmoothStep"
          snapToGrid={true}
          snapGrid={[16, 16]}
          onPaneClick={() => {
            console.log('INSIDE onPaneClick');
          }}
          onPaneScroll={() => {
            console.log('INSIDE onPaneScroll');
          }}
          onElementsRemove={onElementsRemove}
          onElementClick={onElementClick}
          onSelectionDragStop={onSelectionDragStop}
          onNodeDragStop={onNodeDragStop}
        >
          <Background color="#888" gap={16} />
          <MiniMap
            nodeColor={n => {
              if (n.type === 'input') return 'blue';

              return '#FFCC00';
            }}
          />
          <Controls />
        </ReactFlow>

        <div>
          <input
            type="text"
            onChange={e => setName(e.target.value)}
            name="title"
          />
          <button type="button" onClick={addNode}>
            Add Node
          </button>
          <br />
          <br />
          <button type="button" onClick={nice}>
            Press to change background color every second
          </button>

          <button type="button" onClick={notNice}>
            Stop
          </button>
        </div>
      </ReactFlowProvider>
    </Fragment>
  );
};

export default MindNode;
