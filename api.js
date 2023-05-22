router.post("/send-notification", async (req, res) => {
  try {
    const username = req.body.username
    const condition = username ? "WHERE username = '" + username + "'" : ""

    const sql = "SELECT notification_token FROM `Users` " + condition
    const tokens = await sequelize
      .query(sql, { type: QueryTypes.SELECT });

    const data = tokens.map((el) => {
      return {
        to: el.notification_token,
        title: req.body.title,
        subtitle: req.body.subtitle,
        body: req.body.body,
        badge: 2,
        sound: 'default'
      }
    })
    const notificaiton = await axios.post('https://api.expo.dev/v2/push/send', data)


    return res.json({ message: notificaiton })
  } catch (error) {
    return res.json({ message: error })

  }
