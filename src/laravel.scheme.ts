process.on('message', (msg: any) => {
    console.log('msg', msg)
})
if (process.send) {
    process.send('hello from child process')
}
