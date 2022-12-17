import { sendData } from './api.js';

function initForm() {
  const body = document.querySelector('body');

  const form = document.querySelector('.img-upload__form');
  const editImg = document.querySelector('.img-upload__overlay');
  const imgPreview = editImg.querySelector('.img-upload__preview');
  const submitButton = form.querySelector('.img-upload__submit');
  const uploadFile = document.querySelector('#upload-file');
  const closeButton = document.querySelector('#upload-cancel');

  const imgDescr = document.querySelector('.text__description');
  const hashtags = document.querySelector('.text__hashtags');

  const slider = form.querySelector('.effect-level__slider');
  const effects = editImg.querySelector('.effects__list');
  const effectLevelInput = editImg.querySelector('.effect-level__value');
  const fieldSlider = editImg.querySelector('.img-upload__effect-level');

  const buttonScaleSmaller = editImg.querySelector('.scale__control--smaller');
  const buttonScaleBigger = editImg.querySelector('.scale__control--bigger');
  const scaleControl = editImg.querySelector('.scale__control--value');

  const successfulSubmission = document.querySelector('#success').content.querySelector('.success');
  const erroneousSubmission = document.querySelector('#error').content.querySelector('.error');
  const successButton = successfulSubmission.querySelector('.success__button');
  const errorButton = erroneousSubmission.querySelector('.error__button');

  let checkedBox;

  const closeOption = () => {
    body.classList.remove('modal-open');
    editImg.classList.add('hidden');
    document.removeEventListener('keydown', onOverlayEscKeydown);
    closeButton.removeEventListener('click', closeOption);

    uploadFile.value = '';
    imgDescr.value = '';
    hashtags.value = '';

    submitButton.removeAttribute('disabled', 'true');
    form.removeEventListener('submit', submitListener);

    buttonScaleBigger.removeEventListener('click', changeScale);
    buttonScaleSmaller.removeEventListener('click', changeScale);

    effects.removeEventListener('change', effectPicture);
    slider.noUiSlider.destroy();
  };

  function onOverlayEscKeydown(keyEvent) {
    if (keyEvent.keyCode === 27 && keyEvent.target !== hashtags
      && keyEvent.target !== imgDescr && !body.contains(erroneousSubmission)) {
      keyEvent.preventDefault();
      closeOption();
    }
  }

  function changeScale(evt) {
    const scaleValue = scaleControl.value.replace('%', '');
    if (evt.target === buttonScaleSmaller && scaleValue > 0) {
      scaleControl.value = `${parseInt(scaleValue, 10) - 25}%`;
      imgPreview.style.transform = `scale(${(parseInt(scaleValue, 10) - 25) / 100})`;
    } else if (evt.target === buttonScaleBigger && scaleValue < 100) {
      scaleControl.value = `${parseInt(scaleValue.replace(), 10) + 25}%`;
      imgPreview.style.transform = `scale(${(parseInt(scaleValue, 10) + 25) / 100})`;
    }
  }

  function effectPicture(evt) {
    checkedBox = evt.target.id;
    let currentMin = 0;
    let currentMax = 100;
    let currentStart = 100;
    let currentStep = 1;
    switch (evt.target.id) {
      case 'effect-chrome':
        currentMin = 0;
        currentMax = 1;
        currentStep = 0.1;
        currentStart = 1;
        break;
      case 'effect-sepia':
        currentMin = 0;
        currentMax = 1;
        currentStep = 0.1;
        currentStart = 1;
        break;
      case 'effect-marvin':
        currentMin = 0;
        currentMax = 100;
        currentStep = 1;
        currentStart = 100;
        break;
      case 'effect-phobos':
        currentMin = 0;
        currentMax = 3;
        currentStep = 0.1;
        currentStart = 3;
        break;
      case 'effect-heat':
        currentMin = 1;
        currentMax = 3;
        currentStep = 0.1;
        currentStart = 3;
        break;
    }
    slider.noUiSlider.updateOptions({
      range: {
        min: currentMin,
        max: currentMax
      },
      start: currentStart,
      step: currentStep
    });
    if (evt.target.id !== 'effect-none') {
      fieldSlider.classList.remove('hidden');
    } else {
      fieldSlider.classList.add('hidden');
    }

    imgPreview.className = 'img-upload__preview';
    const effectPreview = evt.target.parentNode.querySelector('.effects__preview');
    imgPreview.classList.add(effectPreview.getAttribute('class').split('  ')[1]);
  }

  const effectIntens = () => {
    const sliderValue = slider.noUiSlider.get();
    effectLevelInput.value = sliderValue;
    let filter;
    switch (checkedBox) {
      case 'effect-chrome':
        filter = `grayscale(${sliderValue})`;
        break;
      case 'effect-sepia':
        filter = `sepia(${sliderValue})`;
        break;
      case 'effect-marvin':
        filter = `invert(${sliderValue}%)`;
        break;
      case 'effect-phobos':
        filter = `blur(${sliderValue}px)`;
        break;
      case 'effect-heat':
        filter = `brightness(${sliderValue})`;
        break;
    }
    if (checkedBox === 'effect-none') {
      imgPreview.style.filter = '';
    } else {
      imgPreview.style.filter = filter;
    }
  };

  uploadFile.addEventListener('change', (evt) => {
    document.addEventListener('keydown', onOverlayEscKeydown);

    closeButton.addEventListener('click', closeOption);

    scaleControl.value = `${100}%`;
    imgPreview.style.transform = `scale(${1})`;
    buttonScaleSmaller.addEventListener('click', changeScale);
    buttonScaleBigger.addEventListener('click', changeScale);

    imgPreview.classList.add('effects__preview--none');
    effects.addEventListener('change', effectPicture);

    checkedBox = 'effect-none';
    imgPreview.className = 'img-upload__preview';
    fieldSlider.classList.add('hidden');
    noUiSlider.create(slider, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100
    });
    slider.noUiSlider.on('update', () => {
      effectIntens();
    });

    evt.preventDefault();
    form.addEventListener('submit', submitListener);
    document.body.classList.add('modal-open');
    editImg.classList.remove('hidden');
  });

  let boolHashtagGlobal = true;
  let boolCommentGlobal = true;

  const pristine = new Pristine(form, {
    classTo: 'text',
    errorClass: 'text--invalid',
    successClass: 'text-valid',
    errorTextParent: 'text',
    errorTextTag: 'div',
    errorTextClass: 'text__error'
  }, true);

  const controlSubmit = () => {
    if (!boolHashtagGlobal || !boolCommentGlobal) {
      submitButton.setAttribute('disabled', 'true');
    } else {
      submitButton.removeAttribute('disabled', 'true');
    }
  };

  const hashtagTmpl = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  const isCorrectHashtag = (value) => hashtagTmpl.test(value);

  const validateHashtag = (value) => {
    const hashtag = value.split(' ');
    const bool = hashtag.every(isCorrectHashtag);
    boolHashtagGlobal = bool;
    controlSubmit();
    return bool;
  };

  const isCorrectComment = (value) => value.length < 140;

  const validateComment = (value) => {
    const bool = isCorrectComment(value);
    boolCommentGlobal = bool;
    controlSubmit();
    return bool;
  };

  pristine.addValidator(hashtags, validateHashtag, 'Неккоректный ввод хэш-тегов');

  pristine.addValidator(imgDescr, validateComment, 'Длина комментария не может составлять больше 140 символов');

  const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = 'Опубликовываю...';
  };

  const unblockSubmitButton = () => {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  };

  const closeMessages = () => {
    document.removeEventListener('keydown', escMessage);
    if (body.contains(successfulSubmission)) {
      body.removeChild(successfulSubmission);
      document.removeEventListener('click', closeSuccessMessage);
      successButton.removeEventListener('click', closeMessages);
    }
    if (body.contains(erroneousSubmission)) {
      errorButton.removeEventListener('click', closeMessages);
      document.removeEventListener('click', closeErrorMessage);
      editImg.classList.remove('hidden');
      body.removeChild(erroneousSubmission);
    }
  };

  function closeSuccessMessage(evt) {
    if (evt.target === successfulSubmission) {
      closeMessages();
    }
  }

  function closeErrorMessage(evt) {
    if (evt.target === erroneousSubmission) {
      closeMessages();
    }
  }

  function escMessage(keyEvent) {
    if (keyEvent.keyCode === 27) {
      closeMessages();
    }
  }

  function submitListener(evt) {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          closeOption();
          unblockSubmitButton();
          successButton.addEventListener('click', closeMessages);
          document.addEventListener('keydown', escMessage);
          document.addEventListener('click', closeSuccessMessage);
          body.appendChild(successfulSubmission);
        },
        () => {
          editImg.classList.add('hidden');
          unblockSubmitButton();
          errorButton.addEventListener('click', closeMessages);
          document.addEventListener('keydown', escMessage);
          document.addEventListener('click', closeErrorMessage);
          body.appendChild(erroneousSubmission);
        },
        new FormData(evt.target),
      );
    }
  }
}

export { initForm };
