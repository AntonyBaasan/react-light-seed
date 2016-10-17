import * as actionTypes from "./actionTypes";
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses){
    return {type: actionTypes.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course){
    return {type: actionTypes.CREATE_COURSES_SUCCESS, course};
}

export function updateCourseSuccess(course){
    return {type: actionTypes.UPDATE_COURSES_SUCCESS, course};
}

export function loadCourses(){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return courseApi.getAllCourses().then((courses)=>{
			dispatch(loadCoursesSuccess(courses));
		}).catch(error=>{
			throw(error);
		});
	};
}

export function saveCourse(course){
	return function (dispatch, getState){
		dispatch(beginAjaxCall());
		return courseApi.saveCourse(course).then(course=>{
			course.id ? dispatch(updateCourseSuccess(course)) : dispatch(createCourseSuccess(course));
		}).catch(error=>{
			dispatch(ajaxCallError());
			throw(error);
		});
	};
}