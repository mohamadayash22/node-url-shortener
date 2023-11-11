import { nanoid } from 'nanoid';
import validUrl from 'valid-url';

import '../config/env.js';
import Url from '../models/url.model.js';

const urlIdLength = 8;

export const createUrl = async (req, res, next) => {
  const BASE_URL = process.env.BASE_URL;
  const { fullUrl } = req.body;

  try {
    if (!validUrl.isHttpsUri(fullUrl)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const urlId = nanoid(urlIdLength);
    const shortUrl = `${BASE_URL}/${urlId}`;

    const url = await Url.create({ fullUrl, shortUrl, urlId });
    res.status(201).json(url);
  } catch (error) {
    next(error);
  }
};

export const getUrl = async (req, res, next) => {
  const { urlId } = req.params;
  try {
    const url = await Url.findOne({ urlId: urlId });
    if (!url) {
      return res.status(404).json({ error: 'URL Not Found' });
    }

    url.clicks++;
    await url.save();

    res.redirect(url.fullUrl);
  } catch (error) {
    next(error);
  }
};
