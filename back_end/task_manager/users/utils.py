import random
import string

def random_key_generator(size=10, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def unique_key_id_generator(instance):
    key = random_key_generator()

    Klass = instance.__class__

    qs_exists = Klass.objects.filter(key=key).exists()
    if qs_exists:
        return unique_key_id_generator(instance)
    return key