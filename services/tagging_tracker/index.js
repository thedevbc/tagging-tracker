import axios from 'axios';
import Config from 'react-native-config'

import store from '../../store';
import realm from '../../realm';

export const fetchAddresses = () => (
  axios.get(`${Config.TAGGING_TRACKER_SERVICE_DOMAIN}/address/`)
    .then(response => {
      realm.write(() => {
        realm.delete(realm.objects('Address'));

        response.data.features.forEach((address) => {
          let addressAttributes = Object.assign({}, address.properties);
          addressAttributes.id = address.id.toString();
          addressAttributes.longitude = address.geometry.coordinates[0];
          addressAttributes.latitude = address.geometry.coordinates[1];
          addressAttributes.date_updated = new Date(addressAttributes.date_updated);
          addressAttributes.uploaded_online = true;
          realm.create('Address', addressAttributes);
        });

        return response;
      })
    })
);

export const fetchTags = () => (
  axios.get(`${Config.TAGGING_TRACKER_SERVICE_DOMAIN}/tags/`)
    .then(response => {
      realm.write(() => {
        realm.delete(realm.objects('Tag'));

        response.data.forEach((tag) => {
          let tagAttributes = Object.assign({}, tag);
          tag.id = tag.id.toString();
          tag.address = tag.address.toString();
          tag.uploaded_online = true;
          tag.date_updated = new Date(tag.date_updated);
          tag.date_taken = new Date(tag.date_taken);
          realm.create('Tag', tag);
        });
      });

      return response;
    })
);

export const deleteAddress = (addressId) => {
  console.log('Address ID: ' + addressId);
  return axios.delete(`${Config.TAGGING_TRACKER_SERVICE_DOMAIN}/address/${addressId}/`,
    {
      headers: {'Authorization': `JWT ${store.getState().session.tokens.access.value}`},
    }
  )
};

export const deleteTag = (tagId) => {
  console.log('Tag ID: ' + tagId);
  return axios.delete(`${Config.TAGGING_TRACKER_SERVICE_DOMAIN}/tags/${tagId}/`,
    {
      headers: {'Authorization': `JWT ${store.getState().session.tokens.access.value}`},
    }
  )
};

export const updateTag = (tag) => {
  const tagId = tag.id;
  console.log('Tag ID: ' + tagId);
  axios.put(`${Config.TAGGING_TRACKER_SERVICE_DOMAIN}/tags/${tagId}/`,
    tag,
    {
      headers: {'Authorization': `JWT ${store.getState().session.tokens.access.value}`},
    }
  )
};

export const uploadAddress = (address) => (
  axios.post(`${Config.TAGGING_TRACKER_SERVICE_DOMAIN}/address/`,
    address,
    {
      headers: {'Authorization': `JWT ${store.getState().session.tokens.access.value}`},
    }
  )
);

export const uploadTag = (tag) => (
  axios.post(`${Config.TAGGING_TRACKER_SERVICE_DOMAIN}/tags/`,
    tag,
    {
      headers: {'Authorization': `JWT ${store.getState().session.tokens.access.value}`},
    }
  )
);
