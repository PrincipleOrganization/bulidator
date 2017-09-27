import Bundle from './model';

export const all = (req, res) => {
  try {
    res.status(200).json(Bundle.getBundles());
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const create = (req, res) => {
  try {
    res.status(201).json(Bundle.createBundle(req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const change = (req, res) => {
  try {
    res.status(200).json(Bundle.changeBundle(req.params.id, req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const remove = (req, res) => {
  try {
    res.status(200).json(Bundle.removeBundle(req.params.id));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};
