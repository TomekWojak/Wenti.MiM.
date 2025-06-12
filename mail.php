<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $phone = htmlspecialchars(trim($_POST["phone"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $area = htmlspecialchars(trim($_POST["area"]));
    $tiers = htmlspecialchars(trim($_POST["tiers"]));
    $question1 = $_POST["question-1"] === "yes" ? "tak" : "nie";
    $question2 = $_POST["question-2"] === "yes" ? "tak" : "nie";
    $question3 = $_POST["question-3"] === "yes" ? "tak" : "nie";
    $msg = htmlspecialchars(trim($_POST["msg"]));

    $to = "wenti.mim@gmail.com";
    $subject = "Nowa wiadomość z formularza kontaktowego na stronie Wenti MiM";
    $message = "Imię: $name\n";
    $message .= "Numer telefonu: $phone\n";
    $message .= "Email: $email\n";
    $message .= "Powierzchnia użytkowa: $area\n";
    $message .= "Ilość kondygnacji: $tiers\n";
    $message .= "Czy klient posiada projekt: $question1\n";
    $message .= "Czy instalacja będzie znajdowała się w wylewce: $question2\n";
    $message .= "Czy instalacja będzie podwieszona pod sufitem: $question3\n";
    $message .= "Dodatkowe informacje:\n$msg";

    $headers = "From: Formularz Wenti MiM <wenti.mim@gmail.com>\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $message, $headers)) {
        header("Location: kontakt.html?mail_status=sent");
        exit();
    } else {
        echo "Błąd podczas wysyłania wiadomości.";
    }
} else {
    echo "Nieprawidłowe żądanie.";
}
?>
