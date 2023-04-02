import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const inputSearch = document.querySelector('#search-input');
const buttonSearch = document.querySelector('.btn-search');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');
