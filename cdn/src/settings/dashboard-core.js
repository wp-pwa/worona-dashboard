export default (req, res) => {
  const extensions = req.db.collection('extensions');
  extensions.find({
    service: 'dashboard',
    core: 1,
  }, {
    fields: {
      name: 1,
      main: 1,
      type: 1,
    },
  }).toArray((error, docs) => {
    if (error) throw new Error('Error retrieving docs from extensions');
    res.send(docs);
  });
};
