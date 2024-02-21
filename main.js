const express = require('express');
const authRouter = require('./router/auth/auth');
const adminPanelRouter = require('./router/admin/adminpanel');
const permission = require('./middlewares/checkpermission');

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/adminpanel', adminPanelRouter);
app.use('/adminpanel',checkPermission())

app.listen("4000",()=>{
    console.log("listening on 4000");
});