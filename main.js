const express = require('express');
const authRouter = require('./router/auth/auth');
const adminPanelRouter = require('./router/admin/adminpanel');
const permission = require('./middlewares/checkpermission');
const two_FA = require('./router/auth/2FA_varifier');

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/adminpanel', adminPanelRouter);
app.use('/adminpanel',checkPermission())
app.use('2FA', two_FA)

app.listen("4000",()=>{
    console.log("listening on 4000");
});