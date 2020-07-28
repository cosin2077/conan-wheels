[
  'red',
  'green',
  'black',
  'pink',
  'grey',
  'orange',
].forEach(color => {
  console[color] = (...args) => console.log(`%c ${args[0]}`,`color:white;background-color:${color}`,...args.slice(1))
})