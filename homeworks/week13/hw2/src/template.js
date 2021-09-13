/* eslint-disable */
export const cssTemplate = `
  body {
    background: #ffe8d43d;
    color: #a25a34;
  }

  form {
    text-align: right;
  }

  .progress-bar {
    border-radius: 3px;
    background-color: #d05353;
  }

  .form-title {
    text-align: left;
    color: #d05353;
  }

  .form-control, .form-control:focus {
    padding-left: 5px;
    font-size: 1.2rem;
    letter-spacing: 1px;
    color: #a25a34;
    border-color: #b77a7a;
  }

  .form-control::placeholder { 
    color:  #b77a7a;
    opacity: 1;
  }

  .form-control:focus {
    box-shadow: 0 0 0 0.25rem rgb(183 122 122 / 25%);
  }

  .btn-primary, .btn-primary:focus, .btn-primary:active:focus {
    background-color: #ff9359;
    border-color: #ffe85b;
  }

  .btn-primary:hover, .btn-primary:active, .btn-primary:hover:focus, .btn-primary:active:hover:focus {
    color: #ff9359;
    background: #ffffff;
    border-color: #ff9359;
  }

  .btn-primary:focus, .btn-primary:active:focus {
    color: #ffffff;
    box-shadow: 0 0 0 0.25rem #ffe8ae;
  }

  .cards {
    background: #b77a7a;
    border-top: 1px solid #b77a7a;
    border-radius: .25rem;
  }

  .card {
    border: solid #b77a7a;
    border-width: 0 1px 1px;
    border-radius: 0;
  }

  .card:last-child {
    border-radius: 0 0 0.25rem 0.25rem;
  }

  .card-info {
    width: 100%;
    color: #c3ab9f;
    text-align: right;
  }
`

export function getForm(prefix) {
  return {
    formTemplate: `
      <form class="${prefix}-comments-submit-form">
        <div class="form-title mb-3">
          <label for="${prefix}-comment" class="progress-bar progress-bar-striped progress-bar-animated form-label h1 form-label">Comment-${prefix}</label>
          <div class="mb-3">
            <label for="${prefix}-nickname" class="form-label">Nickname</label>
            <input name="${prefix}-nickname" class="form-control" id="${prefix}-nickname" aria-describedby="emailHelp" placeholder="Enter your nickname here!" />
          </div>
          <textarea name="${prefix}-content" class="form-control" id="${prefix}-comment" rows="3" placeholder="Enter your comment here!"></textarea>
          <input name="${prefix}-site_key" type="hidden" value="${prefix}" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

      <div class="${prefix}-cards cards mt-5 mb-3 text-start"></div>
      <button class="btn btn-primary ${prefix}-btn-load">Read More...</button>
    `,
    commentSubmitSelector: `.${prefix}-comments-submit-form`,
    nicknameSelector: `input[name="${prefix}-nickname"]`,
    contentSelector: `textarea[name="${prefix}-content"]`,
    siteKeySelector: `input[name="${prefix}-site_key"]`,
    cardsSelector: `.${prefix}-cards`,
    btnLoadSelector: `.${prefix}-btn-load`
  }
}
