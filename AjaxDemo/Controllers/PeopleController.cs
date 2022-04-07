﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AjaxDemo.Models;

namespace AjaxDemo.Controllers
{
    public class PeopleController : Controller
    {

        private string _connectionString =
            @"Data Source=.\sqlexpress;Initial Catalog=MyFirstDataBase;Integrated Security=true;";
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAll()
        {
            var repo = new PeopleDb(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public IActionResult AddPerson(Person person)
        {
            var repo = new PeopleDb(_connectionString);
            repo.AddPerson(person);
            return Json(person);
        }


        [HttpPost]
        public IActionResult EditPerson(Person person)
        {
            var repo = new PeopleDb(_connectionString);
            repo.EditPerson(person);
            return Json(person);
        }

        [HttpPost]
        public IActionResult DeletePersonById(int id)
        {
            var repo = new PeopleDb(_connectionString);
            repo.DeletePersonById(id);
            return Json(id);
        }
    }
}
