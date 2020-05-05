/* Author: Reshma */
const form = document.getElementById('course_form');
const submit = document.getElementById('submit');
const main = document.querySelector('main .wrapper');
const container = document.createElement('div');
container.className = 'result';
main.appendChild(container);

var selectedRow = null;
class Subscription {
  constructor(name, course, author) {
    this.name = name;
    this.course = course;
    this.author = author;
  }
}

class Result {
  static addCourseToList(subscription) {
    const list = document.createElement('ul');

    const r_name =  document.createElement('li');
    r_name.innerHTML = `${subscription.name}`;
    list.appendChild(r_name);

    const r_course =  document.createElement('li');
    r_course.innerHTML = `${subscription.course}`;
    list.appendChild(r_course);

    const r_author =  document.createElement('li');
    r_author.innerHTML = `${subscription.author}`;
    list.appendChild(r_author);

    const editButton = document.createElement('li');
    editButton.innerHTML = "<a href='#FIXME' class='edit'>Edit</a>";
    list.appendChild(editButton); 
    editButton.addEventListener('click', (e) => Result.editSub(e.target));

    const deleteButton = document.createElement('li');
    deleteButton.innerHTML = "<a href='#FIXME' class='delete'>Delete</a>";
    list.appendChild(deleteButton); 
    deleteButton.addEventListener('click', (e) => Result.deleteSubscription(e.target));

    container.appendChild(list);    
  }

  static editSubscription(subscription) {
    selectedRow.children[0].textContent = subscription.name;
    selectedRow.children[1].textContent = subscription.course;
    selectedRow.children[2].textContent = subscription.author;
  }

  static deleteSubscription(sub) {
    if(sub.classList.contains('delete')) {
      sub.parentElement.parentElement.remove();
      Result.showAlert('Subscription Deleted', 'danger');
    } else null;
  }

  static editSub(sub) {
    if(sub.classList.contains('edit')) {
      selectedRow = sub.parentElement.parentElement;
      document.getElementById('name').value = selectedRow.children[0].innerHTML;
      document.getElementById('course').value = selectedRow.children[1].innerHTML;
      document.getElementById('author').value = selectedRow.children[2].innerHTML;
    } else null
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    main.insertBefore(div,form);
    setTimeout( () => document.querySelector('.alert').remove(), 3000);
  }

  static clearfields() {
    form.reset();
  }
}

submit.addEventListener('click', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const course = document.getElementById('course').value;
  const author = document.getElementById('author').value;

  if(name === '' || course === '' || author === '') {
    Result.showAlert('empty fields');
  } 
  else {
    const subscription = new Subscription(name, course, author);
    if(selectedRow == null) {
      Result.addCourseToList(subscription);
      selectedRow = null;
      Result.showAlert('Subscription added', 'success');
    } else {
      Result.editSubscription(subscription);
      selectedRow = null;
      Result.showAlert('Subscription modified', 'info');
    }
    Result.clearfields();
  }
});