// create and send token and save it in a cookie
export const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        // secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({ token, user })
}
