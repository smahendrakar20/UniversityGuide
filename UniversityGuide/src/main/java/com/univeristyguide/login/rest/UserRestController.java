package com.univeristyguide.login.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.univeristyguide.login.dto.UserDto;
import com.univeristyguide.login.entity.User;
import com.univeristyguide.login.service.UserService;

@RestController
@RequestMapping("/api")
public class UserRestController {
	
	private UserService  userService;
	
	@Autowired
	public UserRestController(UserService theUserService)
	{
		userService = theUserService;
	}

	// expose "/User" and return list of Users
	@GetMapping("/getusers")
	public ResponseEntity<List<UserDto>> findAll(){
		List<UserDto> users = userService.findAll();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
	
	//@PostMapping("/createuser")

	/*@PostMapping("/user")
>>>>>>> f496acdeebac72166fb98f056fd89cc418309959
	public ResponseEntity<Void> addNewUser(@RequestBody User user){
		user.setId(0);
		userService.saveUser(user);
		return new ResponseEntity<>(HttpStatus.OK);
<<<<<<< HEAD
	}
	  
	@PostMapping("/updateuser")
=======
	}*/
	
	@PostMapping("/createuser")
    public void signUpUser(@RequestBody final User user) {
        this.userService.signUp(user);
    }
	
	@PutMapping("/updateuser")
	public ResponseEntity<UserDto> updateUser(@RequestBody User user)
	{
		userService.updateUser(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/getuser/{userId}")
	public ResponseEntity<UserDto> getUser(@PathVariable int userId)
	{
		UserDto theUserDto = userService.findUserById(userId);
		return new ResponseEntity<>(theUserDto,HttpStatus.OK);
	}
}
