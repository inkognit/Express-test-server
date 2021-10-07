var servers = [
  { id: '1', name: 'AWS', status: 'working' },
  { id: '2', name: 'Google', status: 'working' },
  { id: '3', name: 'yandex', status: 'working' },
  { id: '4', name: 'MS', status: 'pending' },
]
export var getAll = function getAll(req: any, res: any) {
  res.status(200).json(servers)
}

export var create = function create(req: any, res: any) {
  console.log(req.body)
  res.status(201).json({})
}
