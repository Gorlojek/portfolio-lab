<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <link rel="stylesheet" href="<c:url value="resources/css/style.css"/>"/>
</head>
<body>
<header class="header--form-page">

    <jsp:include page="/WEB-INF/views/header.jsp"/>
    <div class="slogan container container--90">
        <div class="slogan--item">
            <h1>
                Oddaj rzeczy, których już nie chcesz<br />
                <span class="uppercase">potrzebującym</span>
            </h1>

            <div class="slogan--steps">
                <div class="slogan--steps-title">Wystarczą 4 proste kroki:</div>
                <ul class="slogan--steps-boxes">
                    <li>
                        <div><em>1</em><span>Wybierz rzeczy</span></div>
                    </li>
                    <li>
                        <div><em>2</em><span>Spakuj je w worki</span></div>
                    </li>
                    <li>
                        <div><em>3</em><span>Wybierz fundację</span></div>
                    </li>
                    <li>
                        <div><em>4</em><span>Zamów kuriera</span></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</header>
<section class="form--steps">
    <div class="form--steps-container">

        <form:form modelAttribute="donation" method="post">
        <div data-step="5" class="active">
            <h3>Podsumowanie Twojej darowizny</h3>
            <div class="summary">
                <div class="form-section">
                    <h4>Oddajesz:</h4>
                    <ul>
                        <li>
                            <span class="icon icon-bag"></span>
                            <span class="summary--text">${donation.quantity} worki (
                                    <c:forEach items="${donation.categories}" var="category" varStatus="counter">
                                        ${category.name}<c:if test="${!counter.last}">, </c:if>
                                    </c:forEach>)</span>
                        </li>

                        <li>
                            <span class="icon icon-hand"></span>
                            <span class="summary--text"
                            >Dla fundacji "${donation.institution.name}"</span
                            >
                        </li>
                    </ul>
                </div>

                <div class="form-section form-section--columns">
                    <div class="form-section--column">
                        <h4>Adres odbioru:</h4>
                        <ul>
                            <li>${donation.street}</li>
                            <li>${donation.city}</li>
                            <li>${donation.zipCode}</li>
                            <li>${donation.phoneNumber}</li>
                        </ul>
                    </div>

                    <div class="form-section--column">
                        <h4>Termin odbioru:</h4>
                        <ul>
                            <li>${donation.pickUpDate}</li>
                            <li>${donation.pickUpTime}</li>
                            <li>${donation.pickUpComment}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="form-group form-group--buttons">
                <a href="<c:url value="/form"/>" type="button" class="btn">Wstecz</a>
                <button type="submit" class="btn">Potwierdzam</button>
            </div>
        </div>
        </form:form>
    </div>
</section>
<jsp:include page="/WEB-INF/views/footer.jsp"/>


<script src="<c:url value="resources/js/app.js"/>"></script>
</body>
</html>
